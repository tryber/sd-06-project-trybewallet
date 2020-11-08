import { EXPENSE, CURRENCIES } from '../actions/index';

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

// expenses: [{
//   "id": 0,
//   "value": "3",
//   "description": "Hot Dog",
//   "currency": "USD",
//   "method": "Dinheiro",
//   "tag": "Alimentação",
//   "exchangeRates": {
//     "USD": {
//       "code": "USD",
//       "name": "Dólar Comercial",
//       "ask": "5.6208",
//       ...
//     },
