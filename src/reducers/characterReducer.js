import * as types from '../actions/actionTypes';
import initialState from './initialState';


let init = initialState();

function generateFog(CP,oldFog){

    let noFog = [[CP.x,CP.y],[CP.x+20,CP.y+20],[CP.x-20,CP.y-20],[CP.x,CP.y+20],[CP.x,CP.y-20],[CP.x+20,CP.y],[CP.x-20,CP.y],[CP.x-20,CP.y+20],[CP.x+20,CP.y-20],[CP.x-40,CP.y],[CP.x+40,CP.y],[CP.x,CP.y+40],[CP.x,CP.y-40]];

    return oldFog.map((tile) =>{
        let tile2 = Object.assign({},tile);
        let test = noFog.filter((a) => {
            return a[0] == tile.x && a[1] == tile.y;
        });

        if (test.length > 0) {
            tile2.fill = 'none';
        } else {
            tile2.fill = 'black'
        }
        return tile2;
    });
}

export default function characterReducer (state = init, action) {

    switch(action.type) {
        case types.CHARACTER_MOVE:

            let character = Object.assign({},state.character);
            character.position = action.move;
            return Object.assign({},state,{character});

        case types.GET_FOG:
             let oldFog =  [...state.fog];
             let CP = Object.assign({},state.character.position);
             return  Object.assign({} , state, {fog:generateFog(CP,oldFog)});

        case types.PROPOSE_POSITION:
             return Object.assign({}, state, {nextMove: action.position});
        case types.UPDATE_PICKUP:
             return Object.assign({},state, {mapElements:action.elements,character:action.character});
        case types.UPDATE_ATTACK:
            return Object.assign({},state, {mapElements:action.elements,character:action.character});
        case types.CHARACTER_DEATH:
            return Object.assign({}, initialState());
        default:

            return state;
    }
}