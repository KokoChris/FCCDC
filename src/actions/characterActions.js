import * as types from './actionTypes';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function characterMove (move) {
    return {type: types.CHARACTER_MOVE , move }
}

export function proposeNextPosition (position) {
    return {type:types.PROPOSE_POSITION, position}
}

export function updateAfterPickup (character,elements) {
    return {type:types.UPDATE_PICKUP, character,elements }
}

export function updateAfterAttack(character,elements) {
    return {type:types.UPDATE_ATTACK, character,elements}
}

export function reportCharacterDead() {
    return {type:types.CHARACTER_DEATH, state:{}}
}

/**
 *
 * @param key the key that was pressed, should be  (UP,DOWN,LEFT,RIGHT)
 * @param boundaries the current room boundaries
 * @param mapElements the array of all map possible interactions(enemies,collectibles)
 * @param character to use the current character position
 * @returns because of redux thunk we are allowed to  return a function which then returns our function creator
 */

export function decideNextMove ({key,boundaries,mapElements,character}) {
    let proposedPosition = Object.assign({},character.position);
    let characterPosition = Object.assign({}, character.position);
    let nextMove;

    if (key === 'ArrowUp' ) {
        proposedPosition.y -= 20;
        let  occupants = [...mapElements].filter(element => {
            return JSON.stringify(proposedPosition) == JSON.stringify(element.position);

        });
        if ( proposedPosition.y < 0) {
            nextMove = { isAllowed:false, position: characterPosition, reason:null}
         }
        if ( occupants.length == 0 && proposedPosition.y >= 0) {
            nextMove = { isAllowed:true, position: proposedPosition, reason:null}
        }
        if (occupants.length == 1 && occupants[0].isEnemy) {
            nextMove =  {isAllowed:false, position: characterPosition ,attemptedPosition:proposedPosition, reason:'element'}
        }
        if (occupants.length == 1 && !occupants[0].isEnemy) {
            nextMove = {isAllowed:true, position: proposedPosition, reason:'collectible'}
        }
    }
    if (key === 'ArrowDown') {
            proposedPosition.y += 20;
            let occupants = [...mapElements].filter(element => {
                return JSON.stringify(proposedPosition) == JSON.stringify(element.position);
            });
            if (proposedPosition.y >= boundaries.y) {
                nextMove = {isAllowed: false, position: characterPosition, reason: null}
            }
            if (occupants.length == 0 && proposedPosition.y <= boundaries.y) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: null}
            }
            if (occupants.length == 1 && occupants[0].isEnemy) {
                nextMove = {isAllowed: false, position: characterPosition,attemptedPosition:proposedPosition, reason: 'element'}
            }
            if (occupants.length == 1 && !occupants[0].isEnemy) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: 'collectible'}
            }
        }
    if (key === 'ArrowRight') {
            proposedPosition.x += 20;
            let occupants = [...mapElements].filter(element => {
                return JSON.stringify(proposedPosition) == JSON.stringify(element.position);
            });
            if (proposedPosition.x >= boundaries.x) {
                nextMove = {isAllowed: false, position: characterPosition, reason: null}
            }
            if (occupants.length == 0 && proposedPosition.x <= boundaries.x) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: null}
            }
            if (occupants.length == 1 && occupants[0].isEnemy) {
                nextMove = {isAllowed: false, position: characterPosition,attemptedPosition:proposedPosition, reason: 'element'}
            }
            if (occupants.length == 1 && !occupants[0].isEnemy) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: 'collectible'}

            }
        }
    if (key === 'ArrowLeft') {
            proposedPosition.x -= 20;
            let occupants = [...mapElements].filter(element => {
                return JSON.stringify(proposedPosition) == JSON.stringify(element.position);
            });
            if (proposedPosition.x <= 0) {
                nextMove = {isAllowed: false, position: characterPosition, reason: null}
            }
            if (occupants.length == 0 && proposedPosition.x >= 0) {
                nextMove = {isAllowed: true, position: proposedPosition, reason: null}
            }
            if (occupants.length == 1 && occupants[0].isEnemy) {
                nextMove = {isAllowed: false, position: characterPosition,attemptedPosition:proposedPosition, reason: 'element'}
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
export function handlePickup({character,mapElements,nextMove}) {
     let char = Object.assign({}, character);
     char.position.x = nextMove.position.x; //workaround to some misunderstandings I have about redux sequence of multiple actions just making sure that position is correct
     char.position.y = nextMove.position.y;


     let unCollected = mapElements.filter((elem) =>  {
       return JSON.stringify(elem.position)  !== JSON.stringify(nextMove.position)
     });
     let collected  = mapElements.filter((elem) => {
        return JSON.stringify(elem.position)  == JSON.stringify(nextMove.position)

     });

    if (collected[0].health) {
        char.increaseHealth(collected[0].health);
        console.log(char.getCurrentHealth())
    }
    if(collected[0].attack) {
        char.increaseAttack(collected[0].attack);
        console.log(char.getAttack());
    }

    return dispatch => {
        return dispatch(updateAfterPickup(char,unCollected))

    }





}
export function  handleAttack({character,mapElements,nextMove}) {
    let char = Object.assign({}, character);
    let tempMapElements = mapElements.map(elem=> {
         elem = JSON.stringify(elem);
         return Object.assign({}, JSON.parse(elem))
    });

    char.position.x = nextMove.position.x; //workaround to some misunderstandings I have about redux sequence of multiple actions just making sure that position is correct
    char.position.y = nextMove.position.y;

    let currentEnemy = tempMapElements.filter( elem => {
        return JSON.stringify(elem.position)  == JSON.stringify(nextMove.attemptedPosition)
    });

    let [ enemy ] = currentEnemy;

    enemy.stats.health -= getRandomInt(1,char.getAttack());
    console.log(enemy.stats.health);
    if(enemy.stats.health <=0) {
        let remainingElements = tempMapElements.filter(elem => {
            return JSON.stringify(elem.position)  !== JSON.stringify(nextMove.attemptedPosition)

        });
        if (enemy.isBoss) {
            return dispatch => {
                return dispatch(reportCharacterDead());
            }
        }
        tempMapElements = remainingElements;
        char.increaseXP(40);
        char.getNeededXp() <= char.getCurrentXp()? char.levelUp() : null ;
        console.log(char.getLevel())

    } else {
        char.decreaseHealth(getRandomInt(1,enemy.stats.attack));
        console.log(char.getCurrentHealth());
        if (char.getCurrentHealth() <= 0 ) {
            return dispatch => {
                return dispatch(reportCharacterDead());
            }
        }

    }


    return dispatch => {
        return dispatch(updateAfterAttack(char,tempMapElements));
    }

}