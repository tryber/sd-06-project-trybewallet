const INITIAL_STATE = { email: '' };
const LOGIN = 'LOGIN';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return ({ email: action.email });
  default:
    return state;
  }
};

export default user;

// Esse reducer será responsável por tratar as informações da pessoa usuária
