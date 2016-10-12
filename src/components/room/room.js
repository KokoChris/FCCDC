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
        this.renderGoblin = this.renderGoblin.bind(this)
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
        return <Character characteristics={{x:this.props.characterReducer.CP.x, y:this.props.characterReducer.CP.y,width:'20',height:'20',fill:'green'}}/>

    }
    renderGoblin(){
         return <Goblin characteristics={{x:this.props.characterReducer.enemy.x, y:this.props.characterReducer.enemy.y, width:'20',height:'20',fill:'yellow'}}/>

    }
    handleKeyUp(ev) {
        ev.preventDefault();
        let code = /Arrow/;
        code.test(ev.key) ? this.props.actions.characterMove(ev.key) : false;
        setTimeout(()=>{ this.props.actions.fogOfWar();}, 50);
    }
    handleKeyDown(ev){
        ev.preventDefault();
        return;
    }

    render() {
        return(
            <svg {...this.props.dimensions} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} tabIndex="1">
                <g>
                    {this.constructGrid()}
                    {this.renderCharacter()}
                    {this.renderGoblin()}
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