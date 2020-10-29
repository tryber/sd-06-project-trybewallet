import { EMAIL_UPDATE, PASSWORD_UPDATE } from '../actions';

const INITIAL_STATE = { email: '', password: '' };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_UPDATE:
    return ({
      ...state,
      email: action.email,
    });
  case PASSWORD_UPDATE:
    return ({
      ...state,
      password: action.password,
    });
  default:
    return state;
  }
};

export default user;
