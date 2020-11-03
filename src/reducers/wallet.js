// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  REQUEST_CURRENCIES,
  FAILED_REQUEST,
  SAVE_EXPENCES,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetched: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetched: true };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currency).filter((coin) => coin !== 'USDT'),
      isFetched: false,
    };
  case FAILED_REQUEST:
    return { ...state, error: action.currencies, isFetching: false };
  case SAVE_EXPENCES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
}
