import initialAppState from '../state';
import { LOG } from '../actions';

export default function logReducer(state = initialAppState, action) {
  const { email } = action;

  switch (action.type) {
  case LOG:
    return { ...state, user: { email } };
  default:
    return state;
  }
}
