// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return {};
  default:
    return state;
  }
}

export default userReducer;
