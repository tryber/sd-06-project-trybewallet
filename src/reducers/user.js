// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};


function userLogin(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ('LOGIN'):
      return { ...state, user: { email: action.email } };
    default:
      return state;
  };
};

export default userLogin;
