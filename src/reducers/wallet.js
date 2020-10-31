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
      currencies: [...state.wallet.currencies],
      expenses: [...state.wallet.expenses, action.payload.expense],
    };
  default:
    return state;
  }
}

export default wallet;
