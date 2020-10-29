import { EMAIL_INPUT } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_INPUT:
    return {
      ...state,
      // email: state.user.email.concat(action.email),
      user: {
        email: action.email,
      },
    };
  case 'RESET':
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default user;
