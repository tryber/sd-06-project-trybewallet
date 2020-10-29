// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
}
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'VALOR':
      return { ...state };

    default:
      return { ...state };
  }
}