import { USER_EMAIL } from '../actions';

const USER_INITIAL_STATE = {
  email: '',
};

const user = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
