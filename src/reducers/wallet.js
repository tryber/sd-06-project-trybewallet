import { EXPENSE, CURRENCIES } from '../actions/index';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
};

function reducerWallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.expense],
      totalExpenses: state.totalExpenses
      + (Number(action.expense.value)
       * action.expense.exchangeRates[action.expense.currency].ask) };
  case CURRENCIES:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}

export default reducerWallet;
