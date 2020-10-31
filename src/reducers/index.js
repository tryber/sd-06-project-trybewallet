import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
// import wallet from './wallet';

// Configure os seus reducers.
const reducersCombined = combineReducers({ user, wallet });

export default reducersCombined;
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
