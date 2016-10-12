import * as types from './actionTypes';

export function characterMove (move) {

    return {type: types.CHARACTER_MOVE , move }
}
/**
 *
 * @param key  the key which was pressed (UP,DOWN,RIGHT,LEFT)
 * @param CP the current character position
 * @param enemies a list of the enemies
 * @param boundaries the current room boundaries
 * @returns the characterMove action creator
 */

export function handleCharacterMove({key,CP,enemy,boundaries}) {

    let proposedPosition = Object.assign({},CP);
    let move;
    if (key === 'ArrowUp' ) {
        proposedPosition.y -= 20;

        if (proposedPosition.y !== enemy.y || proposedPosition.x !== enemy.x) {
            proposedPosition.y >= 0  ?  move = proposedPosition : move = CP;
        }
    }
    if (key === 'ArrowDown') {
        proposedPosition.y += 20;
        if(proposedPosition.y !== enemy.y || proposedPosition.x !== enemy.x) {
            proposedPosition.y <= boundaries.y ? move = proposedPosition : move = CP;
        }

    }
    if (key === 'ArrowRight') {
        proposedPosition.x += 20;
        if(proposedPosition.y !== enemy.y || proposedPosition.x !== enemy.x) {
            proposedPosition.x <= boundaries.x ? move = proposedPosition : move = CP;
        }
    }
    if(key === 'ArrowLeft') {
        proposedPosition.x -= 20;
        if(proposedPosition.y !== enemy.y || proposedPosition.x !== enemy.x) {
            proposedPosition.x >= 0 ? move = proposedPosition : move = CP;
        }
    }

    move = move || CP; //just making sure that nobody uses that without pre-validation for only arrow keys
    return dispatch => {
        return dispatch(characterMove(move));
    }
}