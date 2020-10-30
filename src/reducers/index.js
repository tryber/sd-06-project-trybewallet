import { combineReducers } from 'redux';
import addEmailRecord from './user';
import addExpenseRecord from './wallet';
// import wallet from './wallet';

// Configure os seus reducers.
const reducersCombined = combineReducers({ addEmailRecord, addExpenseRecord });

export default reducersCombined;
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
