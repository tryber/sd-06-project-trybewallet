import { ADD_CURRENCIES, ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';
import { TOOGLE_EDIT_MODE } from '../actions/TOOGLE_EDIT_MODE';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  const filteredExpenses = (action.type === REMOVE_EXPENSE)
    && state.expenses
      .filter((expense) => expense.description !== action.payload.expense)
      .reduce((acc, expense, index) => [...acc, { ...expense, id: index }], []);

  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.payload.currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload.expense] };
  case REMOVE_EXPENSE:
    return { ...state, expenses: [...filteredExpenses] };
  case TOOGLE_EDIT_MODE:
    return { ...state, editMode: action.editMode };
  default:
    return state;
  }
}

export default wallet;
