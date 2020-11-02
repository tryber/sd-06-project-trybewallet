const INITIAL_STATE = { currencyToExchange: 'BRL', expenses: [] };
const WALLET = 'WALLET';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET:
    return ({
      expenses: action.expenses,
      currencyToExchange: action.currencyToExchange,
    });
  default:
    return state;
  }
};

export default wallet;
