import { RECEIVE_CURRENCY_OK } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function usosCarteira(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_CURRENCY_OK:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}
