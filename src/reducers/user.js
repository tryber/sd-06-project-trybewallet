import { LOGIN } from '../actions';

const initialState = {
  user: {
    email: '',
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state.user,
      email: action.email,
    };
  default:
    return state;
  }
}
