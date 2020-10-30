export const USER_REGISTER = 'USER_REGISTER';
export const WALLET = 'WALLET';

export const userRegister = (email) => ({
  type: USER_REGISTER,
  email,
});

export const wallet = () => ({
  type: WALLET,
});
