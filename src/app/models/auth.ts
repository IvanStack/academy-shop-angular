import { User } from './user';

export interface Auth {
  user: User;
}

export const defaults: Auth = {
  user: null,
};
