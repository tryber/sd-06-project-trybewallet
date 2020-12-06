// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY, EXPENSES, DELETE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case CURRENCY:
    return { ...state, currencies: Object.keys(action.currency) };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.id),
    };
  default:
    return state;
  }
}

export default walletReducer;
