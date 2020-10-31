import { SET_LOGIN } from '../actions/types';

const INITIAL_STATE = {
  email: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
