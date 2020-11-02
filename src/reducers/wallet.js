import { RECEIVE_CURRENCY_OK, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function usosCarteira(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_CURRENCY_OK:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
}
