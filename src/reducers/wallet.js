import { GET_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.data,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      total: action.total,
    };
  case DELETE_EXPENSE:
    return { ...state, expenses: action.updatedExpenses };
  case EDIT_EXPENSE:
    return { ...state, expenses: action.updatedExpense };
  default:
    return state;
  }
}

export default wallet;
