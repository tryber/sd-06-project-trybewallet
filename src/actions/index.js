export const LOGIN = 'LOGIN';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});
