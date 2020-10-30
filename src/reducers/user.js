// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
    email: '',
};

function userLogin(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ('LOGIN'):
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default userLogin;
