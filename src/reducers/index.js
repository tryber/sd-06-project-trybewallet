import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './user';
import wallet from './wallet';

const store = createStore(combineReducers({ user, wallet }), applyMiddleware(thunk));

export default store;
