import { Cart, defaults as cartDefaults } from './cart';

export class Order extends Cart {
  uid: string;
  shippingAddress: string;
  status: string;
}

export const defaults = {
  ...cartDefaults,
  uid: null,
  shippingAddress: '',
  status: 'Ordered',
};
