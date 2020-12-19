const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function deleteExpenseById(state, expenseId) {
  const newExpenses = state.expenses.filter((expense) => expense.id !== expenseId);
  return newExpenses;
}

function reducer(state = INITIAL_STATE, action) {
  let newExpenses = [];
  if (action.type === 'DELETE_EXPENSE') {
    newExpenses = deleteExpenseById(state, action.expenseId);
  }
  switch (action.type) {
  case 'SAVE_CURRENCIES':
    return { ...state, currencies: action.currencies };
  case 'SAVE_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case 'DELETE_EXPENSE':
    return ({
      ...state,
      expenses: newExpenses,
    });
  default:
    return state;
  }
}

export default reducer;
