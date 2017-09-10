import { createSelector } from 'reselect';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../../environments/environment';

import { reducer as auth, getUser } from './auth';
import { reducer as users, getSortedUsers } from './users';
import { Auth } from '../models/auth';
import { Users } from '../models/users';

export interface State {
  auth: Auth;
  users: Users;
}

export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [ 'auth' ], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  auth,
  users,
};

export const metaReducers: MetaReducer<State>[] = environment.production
  ? [ localStorageSyncReducer ]
  : [ logger, localStorageSyncReducer ];

export const getUserSelector = createSelector((state: State) => state.auth, getUser);
export const getSortedUsersSelector = createSelector((state: State) => state.users, getSortedUsers);
