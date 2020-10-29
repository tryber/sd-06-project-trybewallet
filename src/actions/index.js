// Coloque aqui suas actions
const LOGIN = 'LOGIN';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});