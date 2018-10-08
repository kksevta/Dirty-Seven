import { ADD_NEW_PLAYER, UPDATE_PLAYER, REMOVE_PLAYER } from '../actions/players-actions';
const playerObject = {
    playerID: '',
    playerName: '',
    playerCreatedAt: 0,
    currentCards: []
};

const initialState = [

]

export const players = (state = initialState, action) => {
    let index = undefined;
    switch (action.type) {
        case ADD_NEW_PLAYER:
            return [...state, { ...playerObject, ...action.payload.playerInfo }];

        case UPDATE_PLAYER:
            return state.map((player) => {
                if (player.playerID === action.payload.playerID) {
                    return { ...player, ...action.payload.playerInfo };
                } else {
                    return player;
                }
            });

        case REMOVE_PLAYER:
            index = state.findIndex((player) => {
                return player.playerID === action.payload.playerID
            })
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];

        default:
            return state
    }
}