import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
import wallet from './wallet';
// import { initialStateWithExpenses } from '../tests/mockData';

const rootReducers = combineReducers({ user, wallet });
const composedThunk = compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export const store = createStore(rootReducers, initialStateWithExpenses, composedThunk);

export const store = createStore(
  rootReducers,
  applyMiddleware(thunk),
);

export default rootReducers;
