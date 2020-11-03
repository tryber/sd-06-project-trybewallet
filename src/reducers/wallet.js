// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_API, ADD_EXPENSES, REMOVE_EXPENSE } from '../actions/WalletForms';

const initialState = {
  total: 0,
  currencies: [],
  expenses: [],

};

const wallet = (state = initialState, action) => {
  const { total } = { ...state };
  switch (action.type) {
  case ADD_EXPENSES:

    return { ...state,
      expenses: [...state.expenses, action.expense],
      total: total + action.convertedValue };

  case CURRENCIES_API:
    return { ...state,
      currencies: Object.keys(action.currencies)
        .filter((currKey) => currKey !== 'USDT') };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses].filter((expense) => expense.id !== action.id),
    };

  default:
    return state;
  }
};

export default wallet;
