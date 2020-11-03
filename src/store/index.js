import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import comboReducers from '../reducers';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    editMode: 'off',
  },
};

const store = createStore(
  comboReducers,
  INITIAL_STATE,
  applyMiddleware(thunk),
);

export default store;
