import { LOGIN_INPUT } from '../actions';

const initialState = {
  email: '',
  password: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case LOGIN_INPUT:
    return { ...state,
      email: action.email,
      password: action.password,
    };
  default:
    return state;
  }
}
