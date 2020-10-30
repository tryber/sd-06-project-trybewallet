import { CURRENCY } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: []
  },
}

export default function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CURRENCY:
      return { ...state, currencies: action.payload };
    default:
      return state;
  }
}
