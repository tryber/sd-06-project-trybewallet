import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return (
      {
        ...state,
        email: action.email,
      });
  default:
    return state;
  }
};
