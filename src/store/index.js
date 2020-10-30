import { createStore } from 'redux';
import rootReducer from '../reducers';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
  isFetching: false,
};

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  // usado para o uso do REDUX DEV TOOLS
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
