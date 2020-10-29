import userReducer from './user';
import { combineReducers } from 'redux';
// import wallet from '../reducers/wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

export const allReducers = combineReducers({
  userReducer,
});