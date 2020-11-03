import { EXPENSES, CURRENCIES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSES:
    return { ...state, expenses: action.expenses };
  case CURRENCIES:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}

export default reducer;
