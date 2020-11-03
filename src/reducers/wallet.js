// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  wallet: {
    currency: [],
    expenses: [],
  },
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'CHANGE':
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default walletReducer;
