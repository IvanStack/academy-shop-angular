import { Action } from '@ngrx/store';
import { User } from '../models/user';
import { Users } from '../models/users';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[User] Load'),
  LOAD_SUCCESS: type('[User] Load Success'),
  UPDATE: type('[User] Update'),
  UPDATE_SUCCESS: type('[User] Update Success'),
  DELETE: type('[User] Delete'),
  DELETE_SUCCESS: type('[User] Delete Success'),
  SERVER_FAIL: type('[User] Server Failure'),
};

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Users) { }
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: User) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: any = null) { }
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: User) { }
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: User) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any = null) { }
}

export type Action
  = LoadAction
  | LoadSuccessAction
  | UpdateAction
  | UpdateSuccessAction
  | DeleteAction
  | DeleteSuccessAction
  | ServerFailAction;
