const INITIAL_STATE = {
  email: '',
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default reducer;
