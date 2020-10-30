import { combineReducers } from 'redux';

import userReducer from './user';
import walletReducer from './wallet';

const reducer = combineReducers({ userReducer, walletReducer });

export default reducer;
