import { initialUserState } from '../state';
import { LOG } from '../actions';

export default function logReducer(state = initialUserState, action) {
  const { email } = action;

  switch (action.type) {
  case LOG:
    return { ...state, email };
  default:
    return state;
  }
}
