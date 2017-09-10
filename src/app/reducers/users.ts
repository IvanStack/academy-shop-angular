import { Users, defaults } from '../models/users';
import { Action, ActionTypes } from '../actions/user';

export function reducer(state: Users = defaults, action: Action) {
  switch (action.type) {
    case ActionTypes.LOAD_SUCCESS:
      return action.payload.reduce((obj, user) => ({ ...obj, [user.uid]: user }));
    case ActionTypes.UPDATE_SUCCESS:
      return { ...state, [action.payload.uid]: action.payload };
    default:
      return state;
  }
}

export const getSortedUsers = (state: Users) => Object.values(state)
  .map(user => [ user.email.toUpperCase(), user ])
  .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
  .map(([, user]) => user);
