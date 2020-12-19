// Esse reducer será responsável por tratar as informações da pessoa usuária
export const LOGIN = 'LOGIN';
export const CHANGE = 'CHANGE';

const initialState = {
  email: '',

};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };

  default:
    return state;
  }
};

export default user;
