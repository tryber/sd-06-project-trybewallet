export const LOGIN_INPUT = 'LOGIN_INPUT';

export const loginInput = (email, password) => ({
  type: LOGIN_INPUT,
  email: email,
  password: password,
});
