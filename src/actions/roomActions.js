import * as types from './actionTypes';

export function roomlayout (layout) {
    return {type: types.GET_ROOM_LAYOUT , layout }
}

export function fogOfWar (fog) {
    return{type: types.GET_FOG, fog}
}