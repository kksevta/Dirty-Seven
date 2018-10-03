import { ADD_NEW_ROOM, UPDATE_ROOM, REMOVE_ROOM } from '../actions/rooms-actions';

// the object which will hold room state
const roomObject = {
    roomID: '',   // id of room
    createdAt: 0, // this would be timestamp when room is created
    canStartedBy: '',
    // createdBy: '',   // UUID of player who created room
    topCard: 1,   // This would be card id which is at the top right now
    currentPlayers: [],   // UUID of players who are present in the room
    winningOrder: [],   // Order of players winning the game
    active: true,   // if room is active
    started: false,  // if match has been started
    finished: false,    //if play is finished
    playerTurn: '',    // player whose turn    
    maxPlayers: 4,   // no of Max Players
    // waitingForPlayers: true, // Waiting for other players to join
    // adminLeft: false,  // if admin left we have to make finished true 
    maxCardsPerPlayer: 7,    // max no of cards per player can have 
    sevenCounter: 0
}


const initialState = []

export const rooms = (state = initialState, action) => {
    let index = undefined;

    switch (action.type) {
        case ADD_NEW_ROOM:
            return [...state, { ...roomObject, ...action.payload.roomInfo }];
        case UPDATE_ROOM:
            return state.map((room) => {
                if (room.roomID === action.payload.roomID) {
                    return { ...room, ...action.payload.roomInfo };
                } else {
                    return room;
                }
            });

        case REMOVE_ROOM:
            index = state.findIndex((room) => {
                return room.roomID === action.payload.roomID
            })
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];


        default:
            return state
    }
}