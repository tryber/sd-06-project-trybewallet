import { ADD_EXPENSES, SELECT_CURRENCY, FILTERED_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case SELECT_CURRENCY:
    return { ...state, currencies: action.currencies };
  case FILTERED_EXPENSES:
    return { ...state, expenses: action.expensesFiltered };
  default:
    return state;
  }
}

export default wallet;
