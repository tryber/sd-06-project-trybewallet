import user from './user';
import wallet from './wallet';

const { combineReducers } = require('redux');

export default combineReducers({
  user,
  wallet,
});
