import { User } from './user';

export interface Users {
  [uid: string]: User;
}

export const defaults: Users = {
};
