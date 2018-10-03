import { Action } from '@ngrx/store';
import { type } from '@app/core/utils/action-type-check';

export const ActionTypes = {
    SOME_ACTION: type('[App] Some Action'),
};

export class SetSomethingAction implements Action {
    readonly type = ActionTypes.SOME_ACTION;
    constructor(public payload?: any) {
        this.payload = payload;
    }
}


export type Actions = SetSomethingAction;
