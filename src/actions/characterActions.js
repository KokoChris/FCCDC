import * as types from './actionTypes';

export function characterMove (move) {

    return {type: types.CHARACTER_MOVE , move }
}
/**
 *
 * @param key  the key which was pressed (UP,DOWN,RIGHT,LEFT)
 * @param character.position the current character position
 * @param enemies a list of the enemies
 * @param boundaries the current room boundaries
 * @returns the characterMove action creator
 */

export function handleCharacterMove({key,enemy,boundaries,enemies,character}) {

    let proposedPosition = Object.assign({},character.position);
    let move;

    if (key === 'ArrowUp' ) {
        proposedPosition.y -= 20;

        let  occupants = [...enemies].filter(enemy => {
            return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
        });
        if ( occupants.length == 0) {
            proposedPosition.y >= 0  ?  move = proposedPosition : move = character.position;
        }
    }
    if (key === 'ArrowDown') {
        proposedPosition.y += 20;
        let  occupants = [...enemies].filter(enemy => {
            return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
        });

        if( occupants.length == 0) {
            proposedPosition.y <= boundaries.y ? move = proposedPosition : move = character.position;
        }

    }
    if (key === 'ArrowRight') {
        proposedPosition.x += 20;
        let  occupants = [...enemies].filter(enemy => {
            return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
        });

        if(occupants == 0) {
            proposedPosition.x <= boundaries.x ? move = proposedPosition : move = character.position;
        }
    }
    if(key === 'ArrowLeft') {
        proposedPosition.x -= 20;

        let  occupants = [...enemies].filter(enemy => {
            return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
        });
        if(occupants == 0) {
            proposedPosition.x >= 0 ? move = proposedPosition : move = character.position;
        }
    }

    move = move || character.position; //just making sure that nobody uses that without pre-validation for only arrow keys
    return dispatch => {
        return dispatch(characterMove(move));
    }
}