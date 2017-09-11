import { createSelector } from 'reselect';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../../environments/environment';

import { reducer as auth, getUser } from './auth';
import { reducer as users, getSortedUsers } from './users';
import { reducer as products } from './products';
import { reducer as cart, getCartCount } from './cart';

import { Auth } from '../models/auth';
import { Users } from '../models/users';
import { Product } from '../models/product';
import { Order } from '../models/order';

export interface State {
  auth: Auth;
  users: Users;
  products: Product[];
  cart: Order;
}

export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [ 'auth', 'products', 'cart' ], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  auth,
  users,
  products,
  cart,
};

export const metaReducers: MetaReducer<State>[] = environment.production
  ? [ localStorageSyncReducer ]
  : [ logger, localStorageSyncReducer ];

export const getUserSelector = createSelector((state: State) => state.auth, getUser);
export const getSortedUsersSelector = createSelector((state: State) => state.users, getSortedUsers);
export const getProductsSelector = createSelector((state: State) => state.products, products => products);
export const getCartSelector = createSelector((state: State) => state.cart, cart => cart);
export const getCartCountSelector = createSelector((state: State) => state.cart, getCartCount);
