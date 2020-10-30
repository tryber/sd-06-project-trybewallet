// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
  }
}

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case: 'USER':
      return 'user';
    default:
      return state;
  }
}
