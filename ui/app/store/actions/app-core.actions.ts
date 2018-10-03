import { Action } from '@ngrx/store';
import { type } from '@app/core/utils/action-type-check';

export const ActionTypes = {
    JOIN_ROOM_REQUEST: type('[App] Join Room Request'),
    SET_AUTH_TOKEN: type('[App] Set Auth Token'),
    SET_LIVE_DATA: type('[App] Set Live Data'),
};

export class JoinRoomRequestAction implements Action {
    readonly type = ActionTypes.JOIN_ROOM_REQUEST;
    constructor(public payload?: any) {
        this.payload = payload;
    }
}

export class SetAuthTokenAction implements Action {
    readonly type = ActionTypes.SET_AUTH_TOKEN;
    constructor(public payload?: any) {
        this.payload = payload;
    }
}

export class SetLiveDataAction implements Action {
    readonly type = ActionTypes.SET_LIVE_DATA;
    constructor(public payload?: any) {
        this.payload = payload;
    }
}
export type Actions = JoinRoomRequestAction | SetAuthTokenAction | SetLiveDataAction;
