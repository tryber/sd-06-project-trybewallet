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

const usersReducer = function userRedux(state = initialState, action) {
  switch (action.type) {
  case 'CHANGE_EMAIL':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};
export default usersReducer;
