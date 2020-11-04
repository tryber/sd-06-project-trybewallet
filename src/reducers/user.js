const INITIAL_STATE = {
  user: {
    email: '',
  },
};
function user(state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
      email: payload.email,
    };
  default:
    return state;
  }
}

export default user;
