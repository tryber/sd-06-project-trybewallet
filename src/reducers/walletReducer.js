import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  ADD_CURRENCY,
  ADD_ID,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      total: action.total,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      ...action.expense,
      total: state.total - action.total,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
      id: undefined,
    };
  case ADD_ID:
    return {
      ...state,
      id: action.id,
    };
  case ADD_CURRENCY:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}

export default wallet;
