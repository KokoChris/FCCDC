import  * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function room (state = {room:initialState.roomState,fog:initialState.fog}, action) {

    switch(action.type) {
        case(types.GET_ROOM_LAYOUT):

            return state;
        default:
            return state;
    }

}
