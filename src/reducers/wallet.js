// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function walletReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NEW_EXPENSES:
      return {...state, expenses: [...state.wallet.expenses, action.payload]};
    case NEW_CURRENCIES:
      return { ... state, currencies: action.payload };
    default:
      return state;
  };
};

export default walletReducer;
