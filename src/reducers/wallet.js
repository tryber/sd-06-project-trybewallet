// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY } from '../actions';

const initialState = {
  currency: [],
  expenses: [],
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case CURRENCY:
    return { ...state, currency: Object.keys(action.currency) };
  default:
    return state;
  }
}

export default walletReducer;
