export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export function addNewPlayerAction(payload) {
    return { type: ADD_NEW_PLAYER, payload }
}

export function updatePlayerAction(payload) {
    return { type: UPDATE_PLAYER, payload }
}

export function removePlayerAction(payload) {
    return { type: REMOVE_PLAYER, payload }
}
