import { ADD_EXPENSES, SELECT_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case SELECT_CURRENCY:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}

export default wallet;
