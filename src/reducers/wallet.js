import {
  REQUEST_RATES,
  GET_RATES,
  FAILED_REQUEST,
  SEND_TO_GLOBAL_STATE,
  SEND_TOTAL_VALUE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  ratesJson: [],
  error: '',
  totalExpenses: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  let newExpenses;
  switch (action.type) {
  case REQUEST_RATES:
    return { ...state, isFetching: true };
  case GET_RATES:
    return { ...state, currencies: action.payload, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, error: action.payload, isFetching: false };
  case SEND_TO_GLOBAL_STATE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case SEND_TOTAL_VALUE:
    return { ...state, totalExpenses: action.payload };
  case DELETE_EXPENSE:
    if (state.expenses.length === 1) {
      newExpenses = [];
    } else {
      newExpenses = [...state.expenses];
      newExpenses.splice(Number(action.payload), 1);
    }
    return { ...state, expenses: newExpenses };
  default:
    return state;
  }
}
