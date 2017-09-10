export interface User {
  displayName: string;
  photoURL: string;
  email: string;
  uid: string;
  isAdmin?: boolean;
  isManager?: boolean;
  billingAddress?: string;
  shippingAddress?: string;
}
