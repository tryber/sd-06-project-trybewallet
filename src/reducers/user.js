const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'USER_LOGIN':
    return { ...state, user: { email: payload } };
  default:
    return state;
  }
}

export default user;
