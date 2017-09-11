import { Action } from '@ngrx/store';
import { Product } from '../models/product';
import { type } from '../util';

export const ActionTypes = {
  LOAD: type('[Product] Load'),
  LOAD_SUCCESS: type('[Product] Load Success'),
  ADD: type('[Product] Add'),
  ADD_SUCCESS: type('[Product] Add Success'),
  UPDATE: type('[Product] Update'),
  UPDATE_SUCCESS: type('[Product] Update Success'),
  DELETE: type('[Product] Delete'),
  DELETE_SUCCESS: type('[Product] Delete Success'),
  SERVER_FAIL: type('[Product] Server Failure'),
};

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Product[]) { }
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

  constructor(public payload: { oldProduct: Product, newProduct: Product }) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: { oldProduct: Product, newProduct: Product }) { }
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: Product) { }
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: Product) { }
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
  | DeleteAction
  | DeleteSuccessAction
  | ServerFailAction;
