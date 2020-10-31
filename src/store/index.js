const { combineReducers } = require("redux");
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ user, wallet }))

export default store;