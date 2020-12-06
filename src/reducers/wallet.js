// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY, EXPENSES, DELETE, EDITING, NEW_EDITING } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editing: { isEditing: false, id: null },
};

const attExpenses = (state, newExpense) => {
  const newArrayExpenses = [...state.expenses];
  newArrayExpenses[newExpense.id] = newExpense;
  return newArrayExpenses;
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case CURRENCY:
    return { ...state, currencies: Object.keys(action.currency) };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.id),
    };
  case EDITING:
    return {
      ...state,
      editing: { isEditing: true, id: action.id },
    };
  case NEW_EDITING:
    return {
      ...state,
      expenses: attExpenses(state, action.expense),
    };
  default:
    return state;
  }
}

export default walletReducer;
