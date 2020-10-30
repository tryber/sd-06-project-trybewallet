import user from './user';
import wallet from './wallet';
import { combineReducers } from 'redux';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
export default combineReducers({
  user,
  wallet,
})
