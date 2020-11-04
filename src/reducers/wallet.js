import { GET_CURRENCY_VALUES_SUCCESS, ADD_EXPENSE } from '../actions';

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
    }
  default:
    return state;
  }
};

export default wallet;
