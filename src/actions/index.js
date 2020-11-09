export const LOGIN = 'LOGIN';

const login = (email) => ({
  type: LOGIN,
  email,
});

export default login;
