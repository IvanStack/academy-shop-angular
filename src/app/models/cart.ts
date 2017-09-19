import { Product } from './product';

export class Cart {
  quantities: {
    [productId: string]: number;
  };
}

export const defaults = {
  quantities: {},
};
