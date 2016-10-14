import * as types from './actionTypes';

export function characterMove (move) {
    return {type: types.CHARACTER_MOVE , move }
}

export function proposeNextPosition (position) {
    return {type:types.PROPOSE_POSITION, position}
}

/**
 *
 * @param key the key that was pressed, should be  (UP,DOWN,LEFT,RIGHT)
 * @param boundaries the current room boundaries
 * @param enemies
 * @param character to use the current character position
 * @returns because of redux thunk we are allowed to  return a function which then returns our function creator
 */

export function decideNextMove ({key,boundaries,enemies,character}) {
    let proposedPosition = Object.assign({},character.position);
    let characterPosition = Object.assign({}, character.position);
    let nextMove;

    if (key === 'ArrowUp' ) {
        proposedPosition.y -= 20;
        let  occupants = [...enemies].filter(enemy => {
            return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);

        });
        if ( proposedPosition.y < 0) {
            nextMove = { isAllowed:false, position: characterPosition, reason:'outOfBounds'}
         }
        if ( occupants.length == 0 && proposedPosition.y >= 0) {
            nextMove = { isAllowed:true, position: proposedPosition, reason:null}
        }
        if (occupants.length == 1 && occupants[0].isEnemy) {
            nextMove =  {isAllowed:false, position: characterPosition , reason:'enemy'}
        }
        if (occupants.length == 1 && !occupants[0].isEnemy) {
            nextMove = {isAllowed:true, position: proposedPosition, reason:'collectible'}
        }


    }
    if (key === 'ArrowDown') {
            proposedPosition.y += 20;
            let occupants = [...enemies].filter(enemy => {
                return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
            });
            if (proposedPosition.y >= boundaries.y) {
                nextMove = {isAllowed: false, position: characterPosition, reason: 'outOfBounds'}
            }
            if (occupants.length == 0 && proposedPosition.y <= boundaries.y) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: null}
            }
            if (occupants.length == 1 && occupants[0].isEnemy) {
                nextMove = {isAllowed: false, position: characterPosition, reason: 'enemy'}
            }
            if (occupants.length == 1 && !occupants[0].isEnemy) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: 'collectible'}
            }
        }
    if (key === 'ArrowRight') {
            proposedPosition.x += 20;
            let occupants = [...enemies].filter(enemy => {
                return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
            });
            if (proposedPosition.x >= boundaries.x) {
                nextMove = {isAllowed: false, position: characterPosition, reason: 'outOfBounds'}
            }
            if (occupants.length == 0 && proposedPosition.x <= boundaries.x) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: null}
            }
            if (occupants.length == 1 && occupants[0].isEnemy) {
                nextMove = {isAllowed: false, position: characterPosition, reason: 'enemy'}
            }
            if (occupants.length == 1 && !occupants[0].isEnemy) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: 'collectible'}

            }

        }
    if (key === 'ArrowLeft') {
            proposedPosition.x -= 20;
            let occupants = [...enemies].filter(enemy => {
                return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
            });
            if (proposedPosition.x <= 0) {
                nextMove = {isAllowed: false, position: characterPosition, reason: 'outOfBounds'}
            }
            if (occupants.length == 0 && proposedPosition.x >= 0) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: null}
            }
            if (occupants.length == 1 && occupants[0].isEnemy) {
                nextMove = {isAllowed: false, position: characterPosition, reason: 'enemy'}
            }
            if (occupants.length == 1 && !occupants[0].isEnemy) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: 'collectible'}

            }
        }

    nextMove = nextMove || { isAllowed:false, position:characterPosition ,reason:null}; //just making sure that nobody uses that without pre-validation for only arrow keys

    return dispatch => {
        return dispatch(proposeNextPosition(nextMove));
    }

}