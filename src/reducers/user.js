// Esse reducer será responsável por tratar as informações da pessoa usuária
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
