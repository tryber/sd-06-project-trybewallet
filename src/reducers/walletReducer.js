// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  ADD_CURRENCY,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: action.expense };
  case REMOVE_EXPENSE:
    return { ...state, expenses: [] };
  case EDIT_EXPENSE:
    return { ...state, expenses: [] };
  case ADD_CURRENCY:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}

export default walletReducer;
