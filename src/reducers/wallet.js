import {
  ADD_EXPENSES,
  SELECT_CURRENCY,
  FILTERED_EXPENSES,
  EDITING_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseEditingId: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses] };
  case SELECT_CURRENCY:
    return { ...state, currencies: action.currencies };
  case FILTERED_EXPENSES:
    return { ...state, expenses: action.expensesFiltered };
  case EDITING_EXPENSE:
    return { ...state, expenseEditingId: action.expenseId };
  default:
    return state;
  }
}

export default wallet;
