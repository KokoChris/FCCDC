


function generateInitialRoomSetup(width,height,TILE_SIZE) {


    const columns = width / TILE_SIZE;
    const rows =  height / TILE_SIZE;

    let tiles = [];
    for ( let row = 0; row < rows; row ++) {
        for (let column = 0; column < columns; column++) {
            let tile;

            // tile = <Tile        key={key}
            //                     x={column * TILE_SIZE}
            //                     y={row * TILE_SIZE}
            //                     width={TILE_SIZE}
            //                     height={TILE_SIZE}
            //                     fill={'darkred' }
            //                     stroke={'black'}
            //                     strokeWidth={0.5}/>;
            tile = {
                x: column * TILE_SIZE,
                y: row * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                fill: 'darkred',
                stroke: 'black',
                strokeWidth: 0.5
            };

            tiles.push(tile);

        }

    }
    return tiles;
}

export default {
    characterPosition:{x:100,y:100},
    roomState: generateInitialRoomSetup(640,480,20)
}