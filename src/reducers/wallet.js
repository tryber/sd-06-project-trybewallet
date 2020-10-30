const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  console.log('e aqui no wallet?');
  switch (action.type) {
  case 'WALLET_INPUT':
    return {
      ...state,
      currencies: state.wallet.currencies.concat(action.currencies),
      expenses: state.wallet.expenses.concat(action.expenses),
    };
  case 'RESET':
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default wallet;
