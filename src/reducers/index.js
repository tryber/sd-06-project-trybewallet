import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

//  const rootReducers = combineReducers({ user, wallet });
const rootReducers = combineReducers({ user });
console.log(rootReducers);
export default rootReducers;
