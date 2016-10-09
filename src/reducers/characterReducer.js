import * as types from '../actions/actionTypes';
import initialState from './initialState';



export default function characterReducer (state = initialState.characterPosition, action) {
    switch(action.type) {
        case types.CHARACTER_MOVE:

            let newPosition = Object.assign({},state);
            if (action.movement === 'ArrowUp') {
                newPosition.y -= 20;
                return newPosition;
            }
            if (action.movement === "ArrowDown") {
                newPosition.y += 20;
                return newPosition;
            }
            if (action.movement ==="ArrowRight") {
                newPosition.x += 20;
                return newPosition;
            }
            if (action.movement ==="ArrowLeft") {
                newPosition.x -= 20;
                return newPosition;
            }


        default:

            return state;
    }
}