function generateInitialRoomSetup(width,height,TILE_SIZE) {

    const columns = width / TILE_SIZE;
    const rows =  height / TILE_SIZE;
    let tiles = [];
    for ( let row = 0; row < rows; row ++) {
        for (let column = 0; column < columns; column++) {
            let tile;

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

function generateInitialFog(CP){
    let templateForFog = Object.assign([],generateInitialRoomSetup(640,480,20));

    let noFog = [[CP.x,CP.y],[CP.x+20,CP.y+20],[CP.x-20,CP.x-20],[CP.x,CP.y+20],[CP.x,CP.y-20],[CP.x+20,CP.y],[CP.x-20,CP.y],[CP.x-20,CP.y+20],[CP.x+20,CP.x-20],[CP.x-40,CP.y],[CP.x+40,CP.y],[CP.x,CP.y+40],[CP.x,CP.y-40]];
    return templateForFog.map((tile) =>{
        let test = noFog.filter((a) => {
            return a[0] == tile.x && a[1] == tile.y;
        });

        if (test.length > 0) {
            tile.fill = 'none';
        } else {
            tile.fill = 'black'
        }
        return tile;

    });


}




export default {
    characterPosition:{x:100,y:100},
    roomState: generateInitialRoomSetup(640,480,20),
    fog: generateInitialFog({x:100,y:100})
}