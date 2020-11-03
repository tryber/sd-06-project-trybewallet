import { GET_CURRENCIES } from '../actions/getCurrencies';
import { ADD_EXPENSE } from '../actions/addExpense';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    // Object.keys() - retorna um array de propriedades enumeraveis de um determinado objeto
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
};

export default wallet;
