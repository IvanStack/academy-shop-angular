import { User } from './user';

export interface Users {
  [key: string]: User;
}

export const defaults: Users = {
};
