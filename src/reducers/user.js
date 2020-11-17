// Esse reducer será responsável por tratar as informações da pessoa usuária
// import login from '../actions';
import { EMAIL_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_LOGIN:
    return {
      ...state, email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducers;
