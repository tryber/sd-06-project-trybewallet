// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES, RECEIVE_CURRENCY_OK } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function walletTransaction(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_CURRENCY_OK:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
}
