import { ADD_USER_EMAIL } from '../actions';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case ADD_USER_EMAIL:
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
}

export default user;
