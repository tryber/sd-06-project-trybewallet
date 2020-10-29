const INITIAL_STATE = { email: '' };
const LOGIN = 'LOGIN';

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
