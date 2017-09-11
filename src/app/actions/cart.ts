import { Action } from '@ngrx/store';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[Cart] Load'),
  LOAD_SUCCESS: type('[Cart] Load Success'),
  ADD: type('[Cart] Add'),
  ADD_SUCCESS: type('[Cart] Add Success'),
  UPDATE: type('[Cart] Update'),
  UPDATE_SUCCESS: type('[Cart] Update Success'),
  SERVER_FAIL: type('[Cart] Server Failure'),
};

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Order) { }
}

export class AddAction implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: Product) { }
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Product) { }
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: Order) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Order) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any = null) { }
}

export type Action
  = LoadAction
  | LoadSuccessAction
  | AddAction
  | AddSuccessAction
  | UpdateAction
  | UpdateSuccessAction
  | ServerFailAction;
