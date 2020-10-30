import { } from 'actions';
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // walletFetch: false,
};

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const walletReducer = (state = INITIAL_STATE, action) => {
  switch (actio.type) {
  case WALLET_REQUEST:
    return {
      ...state,
      currencies: [action.currencies],
      expenses: [action.expenses],
      // walletFetch: false,
    };
  case WALLET_RECEIVE:
    return {
      ...state,
      currencies: [action.currencies],
      expenses: [action.expenses],
      // walletFetch: false,
    };
  case WALLET_RECEIVE_SUCESS:
    return {
      ...state,
      currencies: [action.currencies],
      expenses: [action.expenses],
      // walletFetch: false,
    };
    // case walletReceiveFail:
    //   return {
    //     ...state,
    //     currencies: [action.currencies],
    //     expenses: [action.expenses],
    //     walletFetch: false,
    //   };

  default:
    return state;
  }
};

export default walletReducer;
