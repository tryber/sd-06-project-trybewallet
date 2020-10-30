import { ADD_EXPENSE, ADD_CURRENCY } from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [] };

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case ADD_CURRENCY:
    return {
      ...state,
      currencies: [...state.currencies, action.value],
    };
  default:
    return state;
  }
}

export default walletReducer;
