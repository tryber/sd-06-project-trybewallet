// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function addExpenseRecord(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'addExpense':
    return {
      ...state,
      wallet: {
        currencies: [...state.wallet.currencies],
        expenses: [...state.wallet.expenses, action.payload.expense],
      },
    };
  default:
    return state;
  }
}

export default addExpenseRecord;
