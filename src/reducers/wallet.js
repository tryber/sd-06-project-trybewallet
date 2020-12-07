// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { DELETE_EXPENSE, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.deleteExpense.id),
      ],
    };
  default:
    return state;
  }
}
