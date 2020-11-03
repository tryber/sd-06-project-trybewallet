import { ADD_EXPENSES, SELECT_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return [...state, action.expenses];
  case SELECT_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  default:
    return state;
  }
}

export default wallet;
