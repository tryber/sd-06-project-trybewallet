import { EXPENSES, OK_CURRENCIES, DEL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case OK_CURRENCIES:
    return {
      ...state,
      currencies: [action.currencies],
    };
  case EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.value.expenses],
      total: state.total + action.value.total,
    };
  case DEL_EXPENSE:
    return { ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.value)] };
  default:
    return state;
  }
}
