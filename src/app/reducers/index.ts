import { createSelector } from 'reselect';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../../environments/environment';

import { reducer as auth, getUser } from './auth';

export interface State {
  auth: any;
}

export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [ 'ui' ], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  auth,
};

export const metaReducers: MetaReducer<State>[] = environment.production
  ? [ localStorageSyncReducer ]
  : [ logger, localStorageSyncReducer ];

export const getAuthState = (state: State) => state.auth;
export const getUserSelector = createSelector(getAuthState, getUser);
