import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import user from '../reducers/user';
import wallet from '../reducers/wallet';

const rootReducers = combineReducers({ user, wallet });
const devTools = typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
  ? (a) => a
  : window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();

const composedThunk = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f);

const store = createStore(rootReducers, composedThunk);
export default store;
