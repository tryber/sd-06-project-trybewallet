import { SAVE_EXPENSES, GET_OBJE, DELETE_OBJE, EDIT_OBJE } from '../actions';

const initialState = {
  expenses: [],
  currencies: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case SAVE_EXPENSES: {
    return { ...state,
      expenses: [...state.expenses, action.expense],
    };
  }
  case EDIT_OBJE: {
    const find = state.expenses.find((exp) => exp.id === action.expense.id);
    const newExpense = { ...find, ...action.expense };
    const newArray = [...state.expenses];
    newArray.splice(state.expenses.indexOf(find), 1, newExpense);
    return { ...state, expenses: newArray };
  }
  case GET_OBJE:
    return { ...state, currencies: Object.keys(action.json).filter((c) => c !== 'USDT') };
  case DELETE_OBJE:
    return { ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.expense) };
  default:
    return state;
  }
}
