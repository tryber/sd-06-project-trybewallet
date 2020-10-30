import { LOGIN } from '../actions';

const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      user: {
        email: action.payload,
      },
    };
  default:
    return state;
  }
}

export default userReducer;
