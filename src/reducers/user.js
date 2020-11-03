// Esse reducer será responsável por tratar as informações da pessoa usuária
// import login from '../actions';
import { EMAIL_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function userReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_LOGIN:
    return {
      ...state, email: action.email,
    };
  default:
    return state;
  }
}

// const INITIAL_STATE = {
//   user: {
//     email: '',
//   },
// };

// const userReducers = (state = INITIAL_STATE, action) => {
//   // retorna um novo estado baseado no type da action
//   switch (action.type) {
//   case EMAIL_LOGIN:
//     return { ...state, email: action.email };
//   default:
//     return state;
//   }
// };

// export default userReducers;
