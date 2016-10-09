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

        let  { height, width} = this.props.dimensions;
        const {TILE_SIZE} = this.props;
        const columns = width / TILE_SIZE;
        const rows =  height / TILE_SIZE;

        let tiles = [];
        let key = 0;
        for ( let row = 0; row < rows; row ++) {
            for (let column = 0; column < columns; column++) {
                let tile;

                tile = <Tile        key={key}
                                    x={column * TILE_SIZE}
                                    y={row * TILE_SIZE}
                                    width={TILE_SIZE}
                                    height={TILE_SIZE}
                                    fill={'red' }
                                    stroke={'black'}
                                    strokeWidth={0.5}/>;

                tiles.push(tile);

                key++;
            }

        }
        return tiles;
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