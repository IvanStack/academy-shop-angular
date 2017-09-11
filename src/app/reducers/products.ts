import { Product } from '../models/product';
import { Action, ActionTypes } from '../actions/product';

export function reducer(state: Product[] = [], action: Action) {
  switch (action.type) {
    case ActionTypes.LOAD_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
