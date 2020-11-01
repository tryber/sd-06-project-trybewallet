import { WALLET_CHANGES, GET_CURRENCY } from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_CHANGES:
    return ({
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    });
  case GET_CURRENCY:
    return ({
      ...state,
      currencies: [...state.expenses, ...action.payload.currencies],
    });
  default:
    return state;
  }
};

export default wallet;
