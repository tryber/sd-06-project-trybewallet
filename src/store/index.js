import { createStore, combineReducer } from 'redux';
import user from '../reducers/user';
import wallet from '../reducers/wallet';

const rootReducers = combineReducer({ user, wallet });

const store = createStore({ rootReducers });

export default store;
