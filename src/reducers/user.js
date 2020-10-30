import { EMAIL_INPUT } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  console.log('e aqui no user?, que action é essa? :', action);
  switch (action.type) {
  case EMAIL_INPUT:
    console.log('dentro da funcao do user!');
    return {
      ...state,
      // email: state.user.email.concat(action.email),
      user: {
        email: action.email,
      },
    };
  default:
    return state;
  }
}

// const user = (state = INITIAL_STATE, action) => {
//   console.log('e aqui no user?');
//   switch (action.type) {
//   case EMAIL_INPUT:
//     return {
//       ...state,
//       // email: state.user.email.concat(action.email),
//       user: {
//         email: action.email,
//       },
//     };
//   default:
//     return state;
//   }
// };

export default user;
