import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  UPDATE: type('[User] Update'),
  UPDATE_SUCCESS: type('[User] Update Success'),
  DELETE: type('[User] Delete'),
  DELETE_SUCCESS: type('[User] Delete Success'),
  SERVER_FAIL: type('[User] Server Failure'),
};

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: any = null) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: any = null) { }
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: string) { }
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: any = null) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any = null) { }
}

export type Action
  = UpdateAction
  | UpdateSuccessAction
  | DeleteAction
  | DeleteSuccessAction
  | ServerFailAction;
