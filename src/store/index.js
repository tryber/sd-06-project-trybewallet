import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import walletReducer from '../reducers/wallet';
import userReducer from '../reducers/user';

const rootReducer = combineReducers({walletReducer, userReducer}, applyMiddleware(thunk));

const store = createStore(rootReducer);

export default store;