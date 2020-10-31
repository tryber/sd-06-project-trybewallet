const INITIAL_STATE_USER = {
  email: '',
};

function userReducer(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, ...action.value };
  default:
    return state;
  }
}

export default userReducer;
