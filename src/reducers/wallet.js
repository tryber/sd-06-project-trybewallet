// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  edit: {
    isEditing: false,
    expense: {},
  },
};

function wallet(state = initialState,
  { type, expenses, expenseToRemove, expenseToEdit }) {
  switch (type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expenses] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense !== expenseToRemove)] };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: { ...state.edit, isEditing: true, expense: expenseToEdit } };
  default:
    return state;
  }
}

export default wallet;
