import { EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function emailReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL:
    return {
      ...state,
      email: action.value,
    };
  default:
    return state;
  }
}

export default emailReducer;
