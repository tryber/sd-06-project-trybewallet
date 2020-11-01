import { SAVE_EXPENSES, GET_OBJE, DELETE_OBJE } from '../actions';

const initialState = {
  expenses: [],
  currencies: [],
  sum: '0',
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case SAVE_EXPENSES: {
    const { expense: { value, exchangeRates, currency } } = action;
    const decimalBase = 10;
    return { ...state,
      expenses: [...state.expenses, action.expense],
      sum: (parseFloat(state.sum, decimalBase)
      + (parseInt(value, decimalBase)
      * exchangeRates[currency].ask)).toFixed(2),
    };
  }
  case GET_OBJE:
    return { ...state, currencies: Object.keys(action.json).filter((c) => c !== 'USDT') };
  case DELETE_OBJE:
    return { ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.expense) };
  default:
    return state;
  }
}
