import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const allReducers = combineReducers({
  user,
  wallet,
});

export default allReducers;
