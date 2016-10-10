import  * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function room (state = initialState.roomState, action) {

    switch(action.type) {
        case(types.GET_ROOM_LAYOUT):
            return state;
        default:
            return state;
    }

}
