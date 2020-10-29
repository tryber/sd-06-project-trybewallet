import { createStore } from 'redux';
import comboReducers from '../reducers';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
  isFetchingConversion: false,
};

const store = createStore(comboReducers, INITIAL_STATE);

export default store;
