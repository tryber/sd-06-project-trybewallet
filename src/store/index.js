import { createStore, combineReducers } from 'redux';
import walletReducer from '../reducers';

const rootReducer = combineReducers({ walletReducer });

const store = createStore(rootReducer);

export default store;
