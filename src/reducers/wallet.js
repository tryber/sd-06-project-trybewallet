import { GET_CURRENCIES, ADD_EXPENSES } from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.expense,
      ],
    };
  case GET_CURRENCIES:
    return ({
      ...state,
      currencies: [...Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT')],
    });
  default:
    return state;
  }
}
