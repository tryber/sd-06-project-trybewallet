import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
import wallet from './wallet';

const rootReducers = combineReducers({ user, wallet });
const composedThunk = compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log(composedThunk);

// export const store = createStore(rootReducers, composedThunk);

export const store = createStore(rootReducers, applyMiddleware(thunk));

export default rootReducers;
