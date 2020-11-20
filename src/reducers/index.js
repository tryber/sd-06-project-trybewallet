import { combineReducers } from 'redux';
import user from './user';
import { wallet, exchange } from './wallet';

const rootReducer = combineReducers({ user, wallet, exchange });

export default rootReducer;
