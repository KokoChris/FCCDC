import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as characterActions from '../../actions/characterActions';

import Tile from './tile';
import Character from '../character/Character';



class Room extends Component  {

    constructor(props) {
        super(props);
        this.props = props;
        this.constructGrid = this.constructGrid.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.renderCharacter = this.renderCharacter.bind(this);
    }

    constructGrid() {
        return this.props.roomReducer.map((tile,i) => {
            return <Tile key={i}  {...tile}/>
        });

    }
    renderCharacter(){
        return <Character characteristics={{x:this.props.characterReducer.x, y:this.props.characterReducer.y,width:'20',height:'20',fill:'green'}}/>

    }
    handleKeyUp(ev) {
        ev.preventDefault();
        let code = /Arrow/;
        return code.test(ev.key) ? this.props.actions.characterMove(ev.key) : false;
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
        actions: bindActionCreators( characterActions,dispatch)
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Room);