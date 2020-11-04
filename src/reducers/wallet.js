import {
  ADD_EXPENSE,
  SUCESS_CURRENCY,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, { type, expense, currencies }) {
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expense],
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
