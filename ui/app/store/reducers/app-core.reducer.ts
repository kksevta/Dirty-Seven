import * as AppActions from '../actions/app-core.actions';

export interface IState {
    roomID: any;
    myCards: any;
    topCard: any;
    authToken: string;
    players: any;
    playerTurn: any;
    playersWinningOrder: any;
    gameFinished: any;
    gameStarted: any;
    me: any;
    canStartedBy: any;
    chatMessages: any;
    sevenCounter: any;
}

export const initialState: IState = {
    roomID: '',
    myCards: [],
    topCard: {},
    authToken: '',
    players: [],
    playerTurn: '',
    playersWinningOrder: [],
    gameFinished: false,
    gameStarted: false,
    me: {},
    canStartedBy: '',
    chatMessages: [],
    sevenCounter: 0
};

export function reducer(state = initialState, action: AppActions.Actions): IState {
    switch (action.type) {
        case AppActions.ActionTypes.JOIN_ROOM_REQUEST:
            return {
                ...state,
                roomID: action.payload
            };
        case AppActions.ActionTypes.SET_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload
            };
        case AppActions.ActionTypes.SET_LIVE_DATA:
            return {
                ...action.payload, authToken: state.authToken
            };
        default: {
            return state;
        }
    }
}
