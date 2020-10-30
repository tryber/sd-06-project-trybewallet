const INITIAL_STATE_USER = {
  // user: {
  email: '',
  // },
};

function userReducer(state = INITIAL_STATE_USER, action) {
  console.log(action);
  console.log(action.value);

  switch (action.type) {
  case 'LOGIN':
    return { ...state, ...action.value  };
  default:
    return state;
  }
}

export default userReducer;
