import { EMAIL_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userLogin(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default userLogin;
