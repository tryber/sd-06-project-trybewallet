const INITIAL_STATE_USER = {
  email: '',
};

function userReducer(state = INITIAL_STATE_USER, action) {
  console.log(action);
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: 'teste' };
  default:
    return state;
  }
}

export default userReducer;
