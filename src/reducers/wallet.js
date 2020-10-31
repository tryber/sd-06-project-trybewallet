import { SAVE_EXPENSES, REQUEST_OBJE, GET_OBJE, FAILED_REQUEST } from '../actions';

const initialState = {
  expenses: [],
  error: '',
  currencies: '',
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case SAVE_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case REQUEST_OBJE:
    return state;
  case GET_OBJE:
    return { ...state, currencies: action.payload };
  case FAILED_REQUEST:
    return { ...state, error: action.payload };
  default:
    return state;
  }
}
