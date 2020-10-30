// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_CURRENCIES, SAVE_EXPENSES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.currencies,
      ],
    };
  default:
    return state;
  }
}
