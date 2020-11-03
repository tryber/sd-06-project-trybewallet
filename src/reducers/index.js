import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const combiner = combineReducers({
  user,
  wallet,
});

export default combiner;
