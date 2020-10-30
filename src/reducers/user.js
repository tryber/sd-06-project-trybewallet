// Esse reducer será responsável por tratar as informações da pessoa usuária
export const LOGIN = 'LOGIN';
export const CHANGE = 'CHANGE';

const initialState = {
  email: '',
  status: false,
  password: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, status: action.status, email: action.email };
  case CHANGE:
    return { ...state, [action.name]: action.value };
  default:
    return state;
  }
};

export default user;
