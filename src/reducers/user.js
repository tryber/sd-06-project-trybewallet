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
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
