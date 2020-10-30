export const LOGIN = 'LOGIN';

const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export default loginAction;
