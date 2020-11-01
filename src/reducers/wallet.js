import { FORM_ENTRIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FORM_ENTRIES:
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}

export default wallet;
