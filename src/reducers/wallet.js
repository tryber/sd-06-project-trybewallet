import { SAVE_CURRENCY, SAVE_EXPENSE, EXCLUDE_ITEM } from '../actions';

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
  case EXCLUDE_ITEM:
    return {
      ...state, expenses: [state.expenses.filter((item) => (item.id !== action.id))],
    };
  default:
    return state;
  }
}

export default walletReducer;
