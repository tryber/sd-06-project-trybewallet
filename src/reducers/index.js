import { combineReducers } from 'redux';
import handleStoreUser from './user';
import wallet from './wallet';

const rootReducer = combineReducers({ handleStoreUser, wallet });

export default rootReducer;
