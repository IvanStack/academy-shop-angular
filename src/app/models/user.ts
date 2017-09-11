export class User {
  displayName: string;
  photoURL: string;
  email: string;
  uid: string;
  isAdmin?: boolean;
  isManager?: boolean;
  billingAddress?: string;
  shippingAddress?: string;
}

export const userDefaults = {
  displayName: 'New User',
  photoURL: '',
  email: '',
  uid: '',
  billingAddres: '',
  shippingAddress: '',
};

export const roleDefaults = {
  isAdmin: false,
  isManager: false,
};

export const userProps = values =>
  Object.keys(userDefaults).reduce((user, key) => ({ ...user, [key]: values[key] }), userDefaults);

export const roleProps = values =>
  Object.keys(roleDefaults).reduce((role, key) => ({ ...role, [key]: values[key] }), roleDefaults);
