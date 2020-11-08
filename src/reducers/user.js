import { LOGIN } from '../actions/actionsCreator';

const INITIAL_STATE = {
  email: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

// function handleLoginChange(state = INITIAL_STATE, action) {
//   const { email } = action.payload;

//   return { ...state, email };
// }
// export default function userReducer(state = INITIAL_STATE, action) {
//   switch (action.type) {
//   case LOGIN:
//     return handleLoginChange(state, action);
//   default:
//     return state;
//   }
// }
