// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
import wallet from './wallet';

const rootReducers = combineReducers({
  user,
  wallet,
});

export const store = createStore(
  rootReducers,
  applyMiddleware(thunk),
);
export default rootReducers;
