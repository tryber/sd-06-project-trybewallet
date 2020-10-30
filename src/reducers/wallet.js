// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FILL_CURRENCIES, FILL_EXPENSES } from '../actions/wallet';

const initialState = {
  currencies: [],
  expenses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case FILL_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case FILL_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}
