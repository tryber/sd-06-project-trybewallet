export const LOGIN = 'LOGIN';

const login = (emailAddress) => ({ type: LOGIN, emailAddress });

export default login;
