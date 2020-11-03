import { LOGIN } from '../reducers/user';

const handleLogin = (email = '') => ({
  type: LOGIN,
  email,

});

export default handleLogin;
