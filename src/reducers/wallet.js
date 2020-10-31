import { SAVE_CURRENCY, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  case SAVE_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}

export default walletReducer;
