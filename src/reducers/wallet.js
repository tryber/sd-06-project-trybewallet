import { FETCH_EXCHANGECURRENCIES, ADD_NEW_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_EXCHANGECURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case ADD_NEW_EXPENSE:
    return {
      ...state,
      expenses: action.expenses.expenses,
      total: action.expenses.total,
    };
  default:
    return state;
  }
}
