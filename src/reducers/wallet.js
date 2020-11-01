import { REQUEST_API, RECEIVE_RESPONSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isfetching: false,
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isfatching: true,
    };
  case RECEIVE_RESPONSE:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  default:
    return state;
  }
}
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
