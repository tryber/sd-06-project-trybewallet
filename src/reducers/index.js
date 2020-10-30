import { combineReducers } from 'redux';
import addRecord from './user';
import addExpenseRecord from './wallet';
// import wallet from './wallet';

// Configure os seus reducers.
const reducersCombined = combineReducers({ addRecord, addExpenseRecord });

export default reducersCombined;
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
