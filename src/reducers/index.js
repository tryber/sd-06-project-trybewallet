import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import user from './user';

const reducer = combineReducers({ user });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
