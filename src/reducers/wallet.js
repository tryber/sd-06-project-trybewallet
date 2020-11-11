import {
  CURRENCY_SUCCESS,
  HANDLE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  GET_ID,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: null,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case HANDLE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case GET_ID:
    return {
      ...state,
      isEditing: action.id,
    };
  default:
    return state;
  }
};

export default walletReducer;
