import { HANDLE_USER } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_USER:
    return {
      ...state,
      ...action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
