// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_EXPENSE, DELETE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, { type, expenses, expenseToRemove }) {
  switch (type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expenses] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense !== expenseToRemove)] };
  default:
    return state;
  }
}

export default wallet;
