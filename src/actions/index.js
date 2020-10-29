// Coloque aqui suas actions
const LOGIN = 'LOGIN';

const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export default loginAction;
