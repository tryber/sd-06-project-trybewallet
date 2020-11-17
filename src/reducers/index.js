import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
// reducer do usuario vai armazenar informações do usuario, ou seja email

export default combineReducers({
  user,
  wallet,
});
