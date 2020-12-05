// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSES, LOAD_CURRENCIES } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function registerExpense(state, action) {
  const {
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  } = action.payload;
  const walletExpense = state.expenses;
  const id = walletExpense.length;
  const infoExpense = { id, value, description, currency, method, tag, exchangeRates };
  const actualExpense = [...walletExpense, infoExpense];

  return { ...state, expenses: actualExpense };
}

function reciveCurrencies(state, action) {
  const { currencies } = action.payload;
  return { ...state, currencies };
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSES:
    return registerExpense(state, action);
  case LOAD_CURRENCIES:
    return reciveCurrencies(state, action);
  default:
    return state;
  }
}
