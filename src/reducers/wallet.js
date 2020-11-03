// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ('EXPENSE'):
    return { ...state, expenses: action.expenses };
  case ('FETCH'):
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}

export default walletReducer;
