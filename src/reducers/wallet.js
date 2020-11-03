// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_INPUT, UPDATE_EXCHANGE_INFO, ADD_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  exchangeInfo: {},
};

export default function (state = initialState, action) {
  const { expenses } = state;

  switch (action.type) {
  case WALLET_INPUT:
    return { ...state };
  case UPDATE_EXCHANGE_INFO:
    return { ...state,
      exchangeInfo: action.value,
      currencies: Object.keys(action.value).filter((c) => c !== 'USDT') };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...expenses, { id: expenses.length,
        ...action.value }] };
  default:
    return state;
  }
}
