import {
  ADD_EXPENSE,
  DELETE_EXPENSES,
  SUCESS_CURRENCY,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case SUCESS_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  case DELETE_EXPENSES: {
    const filteredExpenses = state.expenses
      .filter(({ id }) => id !== action.expenseId);
    return {
      ...state,
      expenses: [...filteredExpenses],
    };
  }
  default:
    return state;
  }
}
