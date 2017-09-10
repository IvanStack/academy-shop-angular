import { Auth, defaults } from '../models/auth';
import { Action, ActionTypes } from '../actions/auth';
import { User } from '../models/user';

export function reducer(state: Auth = defaults, action: Action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, user: null };
    default:
      return state;
  }
}

export const getUser = (state: Auth) => state.user;
