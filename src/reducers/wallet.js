// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_EXPENSES:
      return { ...state, expenses: [...state.wallet.expenses, action.payload] };
    case NEW_CURRENCIES:
      return { ...state, currencies: action.payload };
    default:
      return state;
  }
}

export default wallet;
