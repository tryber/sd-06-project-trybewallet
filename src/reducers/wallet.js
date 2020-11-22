import { EXPENSES, OK_CURRENCIES, DEL_EXPENSES, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.expenses.expenses],
      total: state.total + action.expenses.total,
    };
  case OK_CURRENCIES:
    return { ...state, currencies: [...action.value] };
  case DEL_EXPENSES:
    return { ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.expenses)] };
  case EDIT_EXPENSE:
    return { ...state,
      expenses: [...state.expenses],
      total: state.total + action.expenses.total,
    };
  default:
    return state;
  }
}

export default wallet;
