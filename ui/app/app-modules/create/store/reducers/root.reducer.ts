import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as CreateCoreReducer from './create-core.reducer';
import { IAppState } from '@app/store/reducers/root.reducer';


export interface IDashboardState extends IAppState {
    createCore: CreateCoreReducer.IState;
}

export const getCreateState = createFeatureSelector<IDashboardState>('create');


export const getCreateCoreState = createSelector(
    getCreateState, (state: IDashboardState) => state.createCore
);

export const getSomethingFromCoreState = createSelector(getCreateCoreState, (state: CreateCoreReducer.IState) => state.something);

export const reducers = {
    createCore: CreateCoreReducer.reducer,
};
