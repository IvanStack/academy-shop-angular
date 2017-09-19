import { Order } from '../models/order';
import { Product, deletedProduct } from '../models/product';
import { Action, ActionTypes } from '../actions/order';

export function reducer(state: Order[] = [], action: Action) {
  switch (action.type) {
    case ActionTypes.LOAD_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export const getOrders = (orders: Order[], products) =>
  orders.map(order => {
    const items = Object.keys(order.quantities).map(key => ({
      product: products[key] || deletedProduct(key),
      quantity: order.quantities[key]
    })).filter(item => item.quantity > 0);

    const price = items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

    return {
      order,
      items,
      price,
      shippingAddress: order.shippingAddress,
      status: order.status,
    };
  });
