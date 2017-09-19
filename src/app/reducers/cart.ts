import { Cart, defaults } from '../models/cart';
import { Action, ActionTypes } from '../actions/cart';

export function reducer(state: Cart = defaults, action: Action) {
  switch (action.type) {
    case ActionTypes.LOAD_SUCCESS:
      return action.payload.$exists()
        ? action.payload
        : defaults;
    default:
      return state;
  }
}

export const getCartCount = (state: Cart) => Object.values(state.quantities).reduce(
  (sum, quantity) => sum + quantity,
  0,
);

export const getCart = (cart: Cart, products) => ({
  items:
    Object.keys(cart.quantities).map(key => ({
      product: products[key],
      quantity: cart.quantities[key]
    })).filter(item => item.product && item.quantity > 0),
});
