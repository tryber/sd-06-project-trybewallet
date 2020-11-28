import { TOTAL_FIELD } from '../actions';

const INITIAL_STATE = {
  total: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOTAL_FIELD:
    return {
      ...state, total: action.total,
    };
  default:
    return state;
  }
}
