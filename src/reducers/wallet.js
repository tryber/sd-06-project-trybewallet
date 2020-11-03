import { FETCH_SUCCESS, ADD_EXPENSES, REMOVE_ITEM } from '../actions';

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
  case REMOVE_ITEM:
    return {
      ...state,
      expenses: state.expenses.filter((value) => value.id !== action.id),
    };
  default:
    return state;
  }
}
