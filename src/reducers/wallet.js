import { EXPENSES, OK_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  apiCurrencies: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case OK_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  // case REQUEST_CURRENCIES:
  //   return {
  //     ...state,
  //     isFetching: true,
  //   };
  default:
    return state;
  }
};

export default wallet;
