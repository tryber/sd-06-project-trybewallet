import { createStore, combineReducers } from 'redux';
import usersReducer from '../reducers/user';
import walletsReducer from '../reducers/wallet';

const reducers = combineReducers({
  user: usersReducer,
  wallet: walletsReducer,
});

const storeConfig = () => createStore(reducers);

export default storeConfig;
