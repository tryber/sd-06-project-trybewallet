// Coloque aqui suas actions
const LOGIN = 'LOGIN';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export default LOGIN;
