import { FETCH_CURRENCIES, SAVE_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };

  case SAVE_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  }

  case DELETE_EXPENSE: {
    const newExpenses = state.expenses.filter((expense) => expense.id !== action.id);

    return {
      ...state,
      expenses: newExpenses,
    };
  }

  default:
    return state;
  }
}
