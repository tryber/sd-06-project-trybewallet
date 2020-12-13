// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
};

export default function userAction(state = initialState, action) {
  switch (action.type) {
  case 'USER_LOGIN':
    return { ...state, email: action.email };
  default: return state;
  }
}
