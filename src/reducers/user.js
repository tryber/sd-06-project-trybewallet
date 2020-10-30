const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_USER':
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
