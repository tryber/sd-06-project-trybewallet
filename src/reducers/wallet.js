import { GET_DATA, SAVE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_DATA:
    return {
      ...state,
      currencies: Object.keys(action.responseJson)
        .filter((coin) => coin !== 'USDT'),
    };
  case SAVE:
    return {
      ...state, expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}
