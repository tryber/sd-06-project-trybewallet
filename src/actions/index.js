export const LOGIN = 'LOGIN';

export default loginAction = (email) => ({
  type: LOGIN,
  email,
});
