// Esse reducer será responsável por tratar as informações da pessoa usuária
// import login from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const userReducers = (state = INITIAL_STATE, action) => {
  // retorna um novo estado baseado no type da action
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducers;
