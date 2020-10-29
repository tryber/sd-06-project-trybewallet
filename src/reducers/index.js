import { combineReducers } from 'redux';
// import user from './user';
import userReducer from './user';
// import wallet from './wallet';
import walletReducer from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  userReducer,
  walletReducer,
});

export default rootReducer;
