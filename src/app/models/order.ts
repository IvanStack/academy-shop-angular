import { Product } from './product';

export class Order {
  quantities: {
    [productId: string]: number;
  };
  shippingAddress: string;
  status: string;
}

export const defaults: Order = {
  quantities: {},
  shippingAddress: '',
  status: 'New',
};

export const getProp = (key, value = defaults[key]) => ({ [key]: value });
export const orderProps = values =>
  Object.keys(defaults).reduce((user, key) => ({ ...user, ...getProp(key, values[key]) }), defaults);
