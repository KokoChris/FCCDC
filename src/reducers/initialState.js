import  * as models  from '../models';
let {Hero} = models;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

    let noFog = [[CP.x,CP.y],[CP.x+20,CP.y+20],[CP.x-20,CP.y-20],[CP.x,CP.y+20],[CP.x,CP.y-20],[CP.x+20,CP.y],[CP.x-20,CP.y],[CP.x-20,CP.y+20],[CP.x+20,CP.y-20],[CP.x-40,CP.y],[CP.x+40,CP.y],[CP.x,CP.y+40],[CP.x,CP.y-40]];
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


/**
 * numOfElements how many elements you want in the room
 * @returns {Set} of stringified positions
 */
function generatePositionsForElements (width,height,TILE_SIZE,numOfElements) {

    const availableX = width / TILE_SIZE;
    const availableY = height / TILE_SIZE;
    let   setOfPositions = new Set();
    while (setOfPositions.size < numOfElements) {
        let x = getRandomInt(0,availableX) * 20;
        let y = getRandomInt(0,availableY) * 20;
        let obj = {x,y};
        setOfPositions.add(JSON.stringify(obj));
     }
    return setOfPositions;


}

function generateElementsAndCharacter () {
    let elemPositions = Array.from(generatePositionsForElements(620,460,20,40));
    let heroPosition = JSON.parse(elemPositions.splice(0,1)[0]);
    let bossPosition = JSON.parse(elemPositions.splice(0,1)[0]);

    let mapElements = elemPositions.map((elem,i)=> {
        let elemPosition = JSON.parse(elem);
        if (i <= 25) {
            return {
                position:elemPosition,
                stats: {
                    attack:5,
                    health:50
                },
                isEnemy:true,
                fill:'yellow'
            }
        }
       if (i > 25 && i <= 35) {
           return {
               position: elemPosition,
               isEnemy:false,
               health:20,
               attack:null,
               fill:'pink'
           }
       }
       if (i > 35) {
           return {
               position: elemPosition,
               isEnemy:false,
               health:null,
               attack:5,
               fill:'blue'
           }
       }
    });

    return {
        character:new Hero({x:heroPosition.x,y:heroPosition.y,attack:5,health:100,level:1}),
        mapElements
    }
}

export default function () {
    let {character, mapElements} = generateElementsAndCharacter();
    let fog = generateInitialFog(character.position);
    return {
     roomState: generateInitialRoomSetup(640, 480, 20),
     fog,
     boundaries: {x: 620, y: 460},
     mapElements,
     character,
     nextMove: {isAllowed: false, position: {x: 100, y: 100}, attemptedPosition: {x: 100, y: 100}, reason: null}
 }
}