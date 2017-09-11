import { Order, defaults } from '../models/order';
import { Action, ActionTypes } from '../actions/cart';

export function reducer(state: Order = defaults, action: Action) {
  switch (action.type) {
    case ActionTypes.LOAD_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const getCartCount = (state: Order) => Object.values(state.quantities).reduce(
  (sum, quantity) => sum + quantity,
  0,
);
