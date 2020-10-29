import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
//import wallet from './wallet';

const reducer = combineReducers({ user });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
