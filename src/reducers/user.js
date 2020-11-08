// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  type: '',
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ACTION_LOGIN_SUCCESS':
    return { ...state, email: action.email };
  default:
    return state;
  }
}
