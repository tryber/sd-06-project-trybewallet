import {
  ADD_EXPENSES,
  REQUEST_CURRENCIES_PRICE,
  RECEIVE_CURRENCIES_PRICE,
  REMOVE_EXPENSES,
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
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
          id: Object.keys(state.expenses).length,
          exchangeRates: state.currencies[0],
        },
      ],
      totalExpenses: action.totalExpenses,
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((_, indexExpense) => indexExpense !== action.index),
      // totalExpenses: action.totalExpenses,
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
