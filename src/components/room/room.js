import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as characterActions from '../../actions/characterActions';
import * as roomActions from '../../actions/roomActions';

import Tile from './tile';
import Character from '../character/Character';
import Element from '../enemies/element';



class Room extends Component  {

    constructor(props) {

        super(props);
        this.props = props;
        this.constructGrid = this.constructGrid.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.renderCharacter = this.renderCharacter.bind(this);
        this.renderElements = this.renderElements.bind(this)
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
             let {x,y} = element.position;
             if(element.isEnemy) {
                 return <Element key={i} characteristics={{x,y, width:'20',height:'20',fill:'yellow'}}/>

             } else {
                 return <Element key={i} characteristics={{x:x+5, y:y+5, width: '10', height: '10', fill: 'blue'}}/>
             }
         });
    }
    handleKeyUp(ev) {
        ev.preventDefault();
        let {actions} = this.props;
        let {nextMove} = this.props.characterReducer;
        // let args = Object.assign({},{enemy,boundaries,key,enemies,character});
        // if next move is allowed then move
        // if it is allowed and the reason is colleptible then collect
        // if it is not allowed and the reason is out of bounds do nothing
        // if it is not allowed and the reason is enemy then attack
        let nextPosition = Object.assign({}, nextMove.position);
        actions.characterMove(nextPosition);
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
            <svg {...this.props.dimensions} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} tabIndex="1">
                <g>
                    {this.constructGrid()}
                    {this.renderCharacter()}
                    {this.renderElements()}
                    {this.renderCharacter()}
                    {this.constructFog()}
                </g>

            </svg>
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