import { combineReducers, createStore, applyMiddleWare } from 'redux';
import thunk from 'redux-thunk';
import { reducerWallet } from '../reducers';

const rootReducer = combineReducers({ reducerWallet });
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
