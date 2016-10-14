import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as characterActions from '../../actions/characterActions';
import * as roomActions from '../../actions/roomActions';

import Tile from './tile';
import Character from '../character/Character';
import Goblin from '../enemies/goblin';



class Room extends Component  {

    constructor(props) {

        super(props);
        this.props = props;
        this.constructGrid = this.constructGrid.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.renderCharacter = this.renderCharacter.bind(this);
        this.renderEnemies = this.renderEnemies.bind(this)
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
    renderEnemies(){
         return this.props.characterReducer.enemies.map((enemy,i) => {
             let {x,y} = enemy.position;
            return <Goblin key={i} characteristics={{x,y, width:'20',height:'20',fill:'yellow'}}/>
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
        let {enemy,boundaries,enemies,character} = this.props.characterReducer;
        let key = ev.key;
        let args = Object.assign({},{enemy,boundaries,key,enemies,character});
        return code.test(key )?  actions.decideNextMove(args) : false;


    }

    render() {
        return(
            <svg {...this.props.dimensions} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} tabIndex="1">
                <g>
                    {this.constructGrid()}
                    {this.renderCharacter()}
                    {this.renderEnemies()}
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