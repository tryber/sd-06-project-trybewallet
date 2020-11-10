import { CURRENCY, EXPENSES, FUNC_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: ['BRL'],
  expenses: [],
  apiCurrence: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case FUNC_CURRENCIES:
    return {
      ...state,
      apiCurrence: action.apiCurrence,
    };
  default:
    return state;
  }
};

export default wallet;
