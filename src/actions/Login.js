import { LOGIN, CHANGE } from '../reducers/user';

const handleLogin = (email = '', status = false) => ({
  type: LOGIN,
  email,
  status,

});

export const updateForm = ({ target }) => ({
  type: CHANGE,
  name: target.name,
  value: target.value,
  status: false,
});

export default handleLogin;
