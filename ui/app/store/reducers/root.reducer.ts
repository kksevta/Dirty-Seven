import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as AppCoreReducer from './app-core.reducer';

export interface IAppState {
    app: AppCoreReducer.IState;
}

export const getAppState = (state: IAppState) => state.app;
export const getRoomIdFromAppState = createSelector(getAppState, (state: AppCoreReducer.IState) => state.roomID);
export const getAuthTokenFromAppState = createSelector(getAppState, (state: AppCoreReducer.IState) => state.authToken);

export const reducers: ActionReducerMap<IAppState> = {
    app: AppCoreReducer.reducer,
};
