import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// user: {
//   email: '',
// },
// wallet: {
//   currencies: [],
//   expenses: []
// }

const reducer = combineReducers({ user, wallet });

export default reducer;
