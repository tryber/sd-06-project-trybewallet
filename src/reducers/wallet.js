import { CURRENCIES, ADD_EXPENSE, FILTERED_EXPENSES, EDITING_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenseOnEditingId: '',
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case FILTERED_EXPENSES:
    return { ...state, expenses: action.expensesFiltered };
  case EDITING_EXPENSE:
    return { ...state, expenseOnEditingId: action.expenseId };
  default:
    return state;
  }
}
