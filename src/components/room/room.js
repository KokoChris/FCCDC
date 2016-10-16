import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as characterActions from '../../actions/characterActions';
import * as roomActions from '../../actions/roomActions';

import Tile from './tile';
import Character from '../character/Character';
import Element from '../enemies/element';
import StatBox from '../misc/statBox';

class Room extends Component  {

    constructor(props) {

        super(props);
        this.props = props;
        this.constructGrid = this.constructGrid.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.renderCharacter = this.renderCharacter.bind(this);
        this.renderElements = this.renderElements.bind(this);
        this.renderStatBox = this.renderStatBox.bind(this);
    }
    renderStatBox() {
        let {character} = this.props.characterReducer;
        let health = character.getCurrentHealth();
        let attack = character.getAttack();
        let level = character.getLevel();
        return  <StatBox health={health} attack={attack} level={level}/>

    }
    constructGrid() {

        return this.props.characterReducer.roomState.map((tile,i) => {
            return <Tile key={i}  {...tile}/>
        });

    }
    constructFog() {
        return this.props.characterReducer.fog.map((tile,i)=> {
            return <Tile key={i} {...tile} />
        })
    }
    renderCharacter(){
        let {x,y} = this.props.characterReducer.character.position;
        return <Character characteristics={{x, y,width:'20',height:'20',fill:'green'}}/>

    }
    renderElements(){
         return this.props.characterReducer.mapElements.map((element,i) => {
             let {x,y,} = element.position;
             let {fill} = element;
             if(element.isEnemy) {
                 return <Element key={i} characteristics={{x,y, width:'20',height:'20',fill}}/>

             } else {
                 return <Element key={i} characteristics={{x:x+5, y:y+5, width: '10', height: '10',fill}}/>
             }
         });
    }
    handleKeyUp(ev) {
        ev.preventDefault();
        let {actions} = this.props;
        let {nextMove,character,mapElements} = this.props.characterReducer;

        let args = Object.assign({},{mapElements,character,nextMove});

        let nextPosition = Object.assign({}, nextMove.position);

        if (nextMove.isAllowed && nextMove.reason){
            actions.characterMove(nextPosition);
            actions.handlePickup(args)

        }
        if (nextMove.isAllowed && !nextMove.reason) {
            //just move it is an empty space
            actions.characterMove(nextPosition);
        }
        if (!nextMove.isAllowed && nextMove.reason) {
            actions.characterMove(nextPosition);
            actions.handleAttack(args)



        }
        if (!nextMove.isAllowed && !nextMove.reason) {
           return;

        }
            setTimeout(()=>{ this.props.actions.fogOfWar();}, 50);
    }
    handleKeyDown(ev){
        ev.preventDefault();

        let code = /Arrow/;
        let {actions} = this.props;
        let {enemy,boundaries,mapElements,character} = this.props.characterReducer;
        let key = ev.key;
        let args = Object.assign({},{enemy,boundaries,key,mapElements,character});
        return code.test(key )?  actions.decideNextMove(args) : false;
    }

    render() {
        return(
            <div>
                {this.renderStatBox()}

                <svg {...this.props.dimensions} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} tabIndex="1">
                    <g>
                        {this.constructGrid()}
                        {this.renderCharacter()}
                        {this.renderElements()}
                        {this.renderCharacter()}
                        {this.constructFog()}
                    </g>

                </svg>
            </div>
        )
    }

};
function mapStateToProps(state) {
    return state
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({},characterActions,roomActions),dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Room);