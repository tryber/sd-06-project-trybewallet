import { combineReducers } from 'redux';
import user from './user';
import wallet from '../pages/Wallet';

const combiner = combineReducers({
  user,
  wallet,
});

export default combiner;
