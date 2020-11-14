// import { } from 'actions';
const INITIAL_STATE = {
  email: '',
  // userFetch: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
// Esse reducer será responsável por tratar as informações da pessoa usuária
