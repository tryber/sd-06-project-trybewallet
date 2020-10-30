const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_EMAIL':
    return { ...state, user: { email: action.payload } };
  default:
    return state;
  }
}

export default userReducer;
