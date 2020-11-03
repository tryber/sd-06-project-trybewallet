import { REQUEST_API, RECEIVE_RESPONSE, ADD_USER_EXPENSES } from '../actions';

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
      isfetching: true,
    };
  case RECEIVE_RESPONSE:
    return {
      ...state,
      currencies: action.currencies,
      response: { ...action.response },
    };
  case ADD_USER_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.concat(action.expenses),
    };
  default:
    return state;
  }
}
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
