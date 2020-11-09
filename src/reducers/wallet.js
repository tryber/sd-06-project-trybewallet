import { CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCY:
    return { ...state, currencies: Object.keys(action.currency) };
  default:
    return state;
  }
}
