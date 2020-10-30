import { ADD_CURRENCIES, ADD_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.payload.currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload.expense] };
  default:
    return state;
  }
}

export default wallet;
