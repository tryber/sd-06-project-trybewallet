import { CHANGE_EMAIL } from '../actions';

const initialState = {
  user: {
    email: '',
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case CHANGE_EMAIL:
    return { ...state, user: { ...state.user, email: action.email } };
  default:
    return state;
  }
}
