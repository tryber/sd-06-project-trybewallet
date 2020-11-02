import {
  ADD_EXPENSES,
  REQUEST_CURRENCIES_PRICE,
  RECEIVE_CURRENCIES_PRICE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
  isFetching: false,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      totalExpenses: 0,
    };
  case REQUEST_CURRENCIES_PRICE:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES_PRICE:
    return {
      ...state,
      currencies: [action.prices],
      isFetching: false,
    };
  default:
    return state;
  }
}
