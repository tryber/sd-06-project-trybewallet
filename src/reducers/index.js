import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import total from './total';

export default combineReducers({
  user,
  wallet,
});
