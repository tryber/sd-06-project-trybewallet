import { SAVE_CURRENCY } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCY:
    return { ...state, wallet: { ...state.wallet, currencies: action.currencies } };
  default:
    return state;
  }
}

export default walletReducer;
