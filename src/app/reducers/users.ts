import { User } from '../models/user';
import { Users, defaults } from '../models/users';
import { Action, ActionTypes } from '../actions/user';

export function reducer(state: Users = defaults, action: Action) {
  switch (action.type) {
    case ActionTypes.LOAD_SUCCESS: {
      const users = action.payload.users.reduce((obj, user) => ({ ...obj, [user.uid]: user }), {});

      for (const roles of action.payload.roles) {
        const uid = roles.$key;
        if (users[uid]) {
          users[uid] = { ...users[uid], ...roles };
        }
      }

      return users;
    }
    case ActionTypes.UPDATE_SUCCESS:
      return { ...state, [action.payload.uid]: action.payload };
    case ActionTypes.DELETE_SUCCESS: {
      const newState = { ...state };
      delete newState[action.payload.uid];
      return newState;
    }
    default:
      return state;
  }
}

interface UserMap {
  email: string;
  user: User;
}

export const getSortedUsers = (state: Users): User[] => Object.values(state)
  .map((user: User) => ({ email: user.email.toLowerCase(), user }))
  .sort((a, b) => a.email < b.email ? -1 : a.email > b.email ? 1 : 0)
  .map(({ user }) => user);
