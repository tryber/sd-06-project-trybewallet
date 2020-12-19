import { SUCESS_CURRENCIES, SUCESS_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCESS_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case SUCESS_EXPENSES:
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
};

export default wallet;
