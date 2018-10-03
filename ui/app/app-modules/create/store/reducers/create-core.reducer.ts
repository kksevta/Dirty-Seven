import { ActionTypes, Actions } from '../actions/create-core.actions';

export interface IState {
    something: any;
}

export const initialState: IState = {
    something: true,
};

export function reducer(state = initialState, action: Actions): IState {
    switch (action.type) {
        case ActionTypes.SOME_ACTION:
            return {
                ...state,
                something: action.payload
            };

        default: {
            return state;
        }
    }
}
