import { EMAIL, PASSWORD } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL:
    return { ...state, email: action };
  case PASSWORD:
    return { ...state, password: action };
  default:
    return state;
  }
}
