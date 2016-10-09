import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function characterReducer (state = initialState.characterPosition, action) {
    switch(action.type) {
        case types.CHARACTER_MOVE:
            console.log(action);

        default:
            return state;
    }
}