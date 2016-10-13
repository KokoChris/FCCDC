import * as types from './actionTypes';

export function characterMove (move) {

    return {type: types.CHARACTER_MOVE , move }
}

export function proposeNextPosition (position) {
    return {type:types.PROPOSE_POSITION, position}
}

/**
 *
 * @param key  the key which was passed (UP,DOWN,RIGHT,LEFT are the only valid options)
 * @param character.position the current character position
 * @param enemies a list of the enemies
 * @param boundaries the current room boundaries
 * @returns the characterMove action creator
 */

export function handleCharacterMove({key,boundaries,enemies,character}) {

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

        if(occupants.length == 0) {
            proposedPosition.x <= boundaries.x ? move = proposedPosition : move = character.position;
        }
    }
    if(key === 'ArrowLeft') {
        proposedPosition.x -= 20;
        let  occupants = [...enemies].filter(enemy => {
            return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
        });
        if(occupants.length == 0) {
            proposedPosition.x >= 0 ? move = proposedPosition : move = character.position;
        }
    }

    move = move || character.position; //just making sure that nobody uses that without pre-validation for only arrow keys
    return dispatch => {
        return dispatch(characterMove(move));
    }
}

/**
 *
 * @param key
 * @param boundaries
 * @param enemies
 * @param character
 * @returns {function(*)}
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

        if(occupants.length == 0) {
            proposedPosition.x <= boundaries.x ? move = proposedPosition : move = character.position;
        }
    }
    if(key === 'ArrowLeft') {
        proposedPosition.x -= 20;
        let  occupants = [...enemies].filter(enemy => {
            return JSON.stringify(proposedPosition) == JSON.stringify(enemy.position);
        });
        if(occupants.length == 0) {
            proposedPosition.x >= 0 ? move = proposedPosition : move = character.position;
        }
    }

    nextMove = nextMove || character.position; //just making sure that nobody uses that without pre-validation for only arrow keys
    return dispatch => {
        return dispatch(proposeNextPosition(nextMove));
    }


}