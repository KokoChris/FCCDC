import  * as models  from '../models';

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

let mapElements = [
    {position:{x:180,y:200},stats:{attack:5,health:50},isEnemy:true,fill:'yellow'},
    {position:{x:160,y:120},stats:{attack:5,health:50},isEnemy:true,fill:'yellow'},
    {position:{x:140,y:100},stats:{attack:5,health:50},isEnemy:true,fill:'yellow'},
    {position:{x:140,y:140},stats:{attack:5,health:50},isEnemy:false,health:20,attack:null,fill:'pink'},
    {position:{x:200,y:140},stats:{attack:5,health:50},isEnemy:false,health:20,attack:null,fill:'pink'},
    {position:{x:140,y:200},stats:{attack:5,health:50},isEnemy:false,health:null,attack:5,fill:'blue'}
    ];
let {Hero} = models;
let character= new Hero({x:100,y:100,attack:5,health:100,level:1});
export default {

    roomState: generateInitialRoomSetup(640,480,20),
    fog: generateInitialFog({x:100,y:100}),
    boundaries:{x:640,y:480},
    mapElements,
    character,
    nextMove:{isAllowed:false, position:{x:100,y:100}, attemptedPosition:{x:100,y:100},reason: null}

}