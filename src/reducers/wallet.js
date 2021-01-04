import {
  SAVE_EXPENSE,
  SAVE_CURRENCIES_NAMES,
  DELETE_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,

};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EXPENSE:
    return ({
      ...state,
      expenses: [
        ...state.expenses,
        action.payload.expenseData,
      ],
      total: state.total + action.payload.convertedBRLExpense,
    });
  case SAVE_CURRENCIES_NAMES:
    return ({
      ...state,
      currencies: action.payload.currenciesNames,
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => (
          expense.id !== action.payload.expenseId
        )),
      ],
      total: state.total - action.payload.convertedBRLExpense,
    });
  default:
    return state;
  }
}

export default wallet;
