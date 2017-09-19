import { Action } from '@ngrx/store';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { User } from '../models/user';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[Order] Load'),
  LOAD_SUCCESS: type('[Order] Load Success'),
  ADD: type('[Order] Add'),
  ADD_SUCCESS: type('[Order] Add Success'),
  UPDATE_STATUS: type('[Order] Update Status'),
  UPDATE_STATUS_SUCCESS: type('[Order] Update Status Success'),
  DELETE: type('[Order] Delete'),
  DELETE_SUCCESS: type('[Order] Delete Success'),
  SERVER_FAIL: type('[Order] Server Failure'),
};

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Order[]) { }
}

export class UpdateStatusAction implements Action {
  readonly type = ActionTypes.UPDATE_STATUS;

  constructor(public payload: { order: Order, orderStatus: string }) { }
}

export class UpdateStatusSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_STATUS_SUCCESS;

  constructor(public payload: { order: Order, orderStatus: string }) { }
}

export class AddAction implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: Order) { }
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Order) { }
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: Order) { }
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: Order) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any = null) { }
}

export type Action
  = LoadAction
  | LoadSuccessAction
  | UpdateStatusAction
  | UpdateStatusSuccessAction
  | AddAction
  | AddSuccessAction
  | DeleteAction
  | DeleteSuccessAction
  | ServerFailAction;
