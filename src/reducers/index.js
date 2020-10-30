import { combineReducers } from 'redux';
import addRecord from './user';
// import wallet from './wallet';

// Configure os seus reducers.
const reducersCombined = combineReducers({ addRecord });

export default reducersCombined;
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
