import {
  ADD_EXPENSES,
  REQUEST_CURRENCY,
  SUCESS_CURRENCY,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, { type, expenses, currencies }) {
  switch (type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses,
    };
  case REQUEST_CURRENCY:
    return {
      ...state,
    };
  case SUCESS_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  default:
    return state;
  }
}
