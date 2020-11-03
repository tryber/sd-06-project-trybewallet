// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  // retorna um novo estado baseado no type da action
  switch(action.type){
  case 'LOGIN':
    return { ...state, email: action.email };
  default:
    return state;
  }
}