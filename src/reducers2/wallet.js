import { DELETE_DATA, EDIT_DATA, GET_DATA, SAVE_EXPENSES } from '../actions';

const initialState = {
  expenses: [],
  currencies: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case GET_DATA:
    return { ...state, currencies: Object.keys(action.json).filter((c) => c !== 'USDT') };

  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };

  case EDIT_DATA: {
    const find = state.expenses.find((exp) => exp.id === action.expense.id);
    const newExpense = { ...find, ...action.expense };
    const newArray = [...state.expenses];
    newArray.splice(state.expenses.indexOf(find), 1, newExpense);
    return {
      ...state,
      expenses: newArray,
    };
  }

  case DELETE_DATA:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.expense),
    };

  default:
    return state;
  }
}
