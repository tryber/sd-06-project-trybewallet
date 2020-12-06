import { RESPONSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  case RESPONSE:
    return { ...state, currencies: action.prices };
  default:
    return state;
  }
}

export default wallet;
