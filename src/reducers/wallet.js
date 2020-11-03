import { CURRENCIES, ADD_EXPENSE, FILTERED_EXPENSES } from '../actions';

const INITIAL_STATE = {
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
  default:
    return state;
  }
}
