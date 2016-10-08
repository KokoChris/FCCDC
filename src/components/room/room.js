import React, {PropTypes} from 'react';
import Tile from './tile';

/**
 *
 * @param dimensions are the height and width of the board
 * @returns an svg board with multiple rect elements grouped under a g tag
 *
 */

const Room = (dimensions) => {

    let  {height,width} = dimensions;
    const TILE_SIZE = 20; // Ill use that for deciding how many tiles we ll have on a given svg height, for now I assume that we ll always have 640 * 480 so 20 evens out perfectly

    const columns = width / TILE_SIZE;
    const rows =  height / TILE_SIZE;

    let tiles = [];
    let key = 0;
    for ( let i = 0; i <= columns; i++) {
        for (let j = 0; j <= rows; j++) {

            let tile = <Tile key={key}
                             x={i * TILE_SIZE}
                             y={j * TILE_SIZE}
                             width={TILE_SIZE}
                             height={TILE_SIZE}
                             fill={'red'}
                             stroke={'black'}
                             strokeWidth={0.5} />;
            tiles.push(tile);
            key++;
        }
    }

    return(
        <svg {...dimensions} >
            <g>
                {tiles}
            </g>
        </svg>
    )
};




export default Room;