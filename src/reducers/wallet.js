import { ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      expenses: [...state.expenses, action.expenses],
      totalExpenses: 0,
    };
  default:
    return state;
  }
}
