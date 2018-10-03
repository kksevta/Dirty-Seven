export const ADD_NEW_ROOM = 'ADD_NEW_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';

export function addNewRoomAction(payload) {
    return { type: ADD_NEW_ROOM, payload }
}
export function updateRoomAction(payload) {
    return { type: UPDATE_ROOM, payload }
}

export function removeRoomAction(payload) {
    return { type: REMOVE_ROOM, payload }
}
