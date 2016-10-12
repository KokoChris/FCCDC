import * as types from '../actions/actionTypes';
import initialState from './initialState';

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

export default function characterReducer (state = initialState, action) {

    switch(action.type) {
        case types.CHARACTER_MOVE:


            return Object.assign({},state,{CP:action.move});

        case types.GET_FOG:

             let oldFog =  [...state.fog];
             let CP = Object.assign({},state.CP);
             return  Object.assign({} , state, {fog:generateFog(CP,oldFog)});



        default:

            return state;
    }
}