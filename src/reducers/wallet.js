import { REQUEST_RATES, GET_RATES, FAILED_REQUEST, SEND_TO_GLOBAL_STATE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  ratesJson: [],
  error: '',
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_RATES:
      return { ...state, isFetching: true };
    case GET_RATES:
      return { ...state, ratesJson: action.payload, isFetching: false };
    case FAILED_REQUEST:
      return { ...state, error: action.payload, isFetching: false };
    case SEND_TO_GLOBAL_STATE:
      return { ...state, expenses: [...state.expenses, action.payload] }
    default:
      return state;
  }
}
