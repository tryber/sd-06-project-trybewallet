import { CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCY:
    return { ...state,
      currencies: Object.keys(action.currencies).filter((cur) => cur !== 'USDT') };
  default:
    return state;
  }
}
