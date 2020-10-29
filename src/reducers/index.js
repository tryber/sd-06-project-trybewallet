import user from './user';
import wallet from './wallet';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  user,
  wallet
});

export default rootReducers;
