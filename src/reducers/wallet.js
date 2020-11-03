import {
  ADD_CURRENCIES,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  TOOGLE_EDIT_MODE,
  SAVE_EDITED_EXPENSE,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editMode: 'off',
};

function wallet(state = initialState, action) {
  const filteredExpenses = (action.type === REMOVE_EXPENSE)
    && state.expenses
      .filter((expense) => expense.description !== action.payload.expense)
      // .reduce((acc, expense, index) => [...acc, { ...expense, id: index }], [])
      .sort((a, b) => a.id - b.id);

  const editedExpenses = (action.type === SAVE_EDITED_EXPENSE)
    ? state.expenses
      .filter((expense) => expense.id !== action.payload.id)
      .concat(action.payload)
      .sort((a, b) => a.id - b.id)
    : null;

  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.payload.currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload.expense] };
  case REMOVE_EXPENSE:
    return { ...state, expenses: [...filteredExpenses] };
  case TOOGLE_EDIT_MODE:
    return { ...state, editMode: action.editMode };
  case SAVE_EDITED_EXPENSE:
    return { ...state, expenses: [...editedExpenses], editMode: 'off' };
  default:
    return state;
  }
}

export default wallet;
