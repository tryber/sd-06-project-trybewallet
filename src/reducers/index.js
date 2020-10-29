import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import user from './user';
// import wallet from './wallet';

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

const rootReducers = combineReducers({ user });

const configureStore = function () {
  return createStore(
    rootReducers,
    composeWithDevTools(
      /* logger must be the last middleware in chain to log actions */
      applyMiddleware(thunk)
    )
  );
}

export default configureStore;