import { FETCH_SUCCESS, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}
