const { LOGIN_USER } = require('../actions');

const GET_INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const user = (state = GET_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return { ...state, user: { email: action.payload } };
  default:
    return state;
  }
};

export default user;
