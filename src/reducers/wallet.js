import {
  GET_CURRENCY_VALUES_SUCCESS,
  ADD_EXPENSE,
  DELETE_SELECTED_EXPENSES,
} from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [] };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY_VALUES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.newExpense],
    };
  case DELETE_SELECTED_EXPENSES:
    return {
      ...state,
      expenses: state.expenses
        .filter((currentExpense) => currentExpense.id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
