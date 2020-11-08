import { TOTAL_EXPENSES, CURRENCY } from '../actions/actionsCreator';

const INITIAL_STATE = {
  totalExpenses: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOTAL_EXPENSES:
    return { ...state, ...action.payload };
  case CURRENCY:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
