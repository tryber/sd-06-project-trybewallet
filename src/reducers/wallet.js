import { ADD_EXPENSES, SELECT_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return [...state, action.expenses];
  case SELECT_CURRENCY:
    return [...state, action.currencies];
  default:
    return state;
  }
}

export default walletReducer;
