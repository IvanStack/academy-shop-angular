export interface User {
  displayName: string;
  photoURL: string;
  uid: string;
  isAdmin?: boolean;
  isManager?: boolean;
  billingAddress?: string;
  shippingAddress?: string;
}
