import { createStore, combineReducers } from 'redux';
import user from '../reducers/user';
import wallet from '../reducers/wallet';

const rootReducers = combineReducers({ user, wallet });

const store = createStore(rootReducers);

export default store;
