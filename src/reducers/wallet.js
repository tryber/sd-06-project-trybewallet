import { CURRENCIES_FETCH } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES_FETCH:
    return {
      ...state.currencies,
      currencies: Object.keys(action.currencies),
    };
  default:
    return state;
  }
}
