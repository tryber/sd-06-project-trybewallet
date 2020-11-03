import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const comb = combineReducers({ user, wallet });

export default comb;
