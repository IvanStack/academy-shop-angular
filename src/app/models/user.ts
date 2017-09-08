import { Address } from './address';

export interface User {
  displayName: string;
  photoURL: string;
  uid: string;
  isAdmin?: boolean;
  isManager?: boolean;
  billingAddress?: Address;
  shippingAddress?: Address;
}
