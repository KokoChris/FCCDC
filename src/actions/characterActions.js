import * as types from './actionTypes';

export function characterMove (movement) {

    return {type: types.CHARACTER_MOVE , movement }
}

export function handleCharacterMove(movement) {
    return dispatch => {
        return dispatch(characterMove(movement));
    }
}