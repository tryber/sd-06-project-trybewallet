import { ADD_CURRENCIES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.payload.currencies };
  default:
    return state;
  }
}

export default wallet;
