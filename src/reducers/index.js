import { combineReducers, createStore } from 'redux';
import user from './user';
import wallet from './wallet';

const rootReducers = combineReducers({ user, wallet });

export const store = createStore(rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default rootReducers;
