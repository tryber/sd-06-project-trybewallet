import { combineReducers, createStore } from 'redux';
import usersReducer from './user';
import walletsReducers from './wallet';

const reducers = combineReducers({
  users: usersReducer,
  wallets: walletsReducers,
});

function storeConfig() {
  return createStore(reducers);
}
export default storeConfig;
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
