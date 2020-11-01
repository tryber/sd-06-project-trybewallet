// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletsReducer = function walletRedux(state = initialState, action) {
  switch (action.type) {
  case 'CHANGE_WALLET':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};
export default walletsReducer;
