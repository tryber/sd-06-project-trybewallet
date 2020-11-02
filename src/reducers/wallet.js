// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'addExpense':
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expense],
    };
  case 'deleteExpense':
    return {
      ...state,
      expenses: [...state.expenses]
        .splice(state.expenses.indexOf(action.payload.expense), action.payload.expense),
    };
  default:
    return state;
  }
}

export default wallet;
