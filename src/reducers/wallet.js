import { WALLET_CHANGES } from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_CHANGES:
    return ({
      ...state,
      currencies: [...state.currencies, action.payload.currencies],
      expenses: [...state.expenses, action.payload.expenses],
    });
  default:
    return state;
  }
};

export default wallet;
