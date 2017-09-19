export class User {
  displayName: string;
  photoURL: string;
  email: string;
  uid: string;
  isAdmin?: boolean;
  isManager?: boolean;
  billingAddress?: string;
  shippingAddress?: string;
  orders: object;
}

export const userDefaults = {
  displayName: 'New User',
  photoURL: '',
  email: '',
  uid: '',
  billingAddress: '',
  shippingAddress: '',
  orders: {},
};

export const roleDefaults = {
  isAdmin: false,
  isManager: false,
};

export const userProps = values =>
  Object.keys(userDefaults).reduce(
    (user, key) => key in values
      ? { ...user, [key]: values[key] }
      : user,
    userDefaults,
  );

export const roleProps = values =>
  Object.keys(roleDefaults).reduce(
    (role, key) => key in values
      ? { ...role, [key]: values[key] }
      : role,
    roleDefaults,
  );
