// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  } };

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_WALLET':
    return { ...state, action };
  default:
    return state;
  }
}

export default wallet;
