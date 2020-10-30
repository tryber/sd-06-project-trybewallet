import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// const INITIAL_STATE = {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: [],
//   },
// };

const composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : (...args) => {
      if (args.length === 0) return undefined;
      if (typeof args[0] === 'object') return compose;
      return compose(...args);
    }
);
const rootReducers = combineReducers({ user, wallet });
export default rootReducers;
export const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
