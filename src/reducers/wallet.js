import { CURRENCY, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCY:
    return { ...state,
      currencies: action.currencies };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
}
