import {  } from 'actions';
const INITIAL_STATE = {
  email: "",
  // userFetch: false,
};

// Esse reducer será responsável por tratar as informações da pessoa usuária
const userReducer = (state = INITIAL_STATE, action) => {
  switch (actio.type) {
    case USER_REQUEST:
      return {
        ...state,
        email: action.email.value,
        // userFetch: false,
      }
    // case USER_RECEIVE:
      // return {
      //   ...state,
      //   email: action.email.value,
      //   userFetch: false,
      // }
    case USER_RECEIVE_SUCESS:
      return {
        ...state,
        email: action.email.value,
        // userFetch: false,
      }
    // case USER_RECEIVE_FAIL:
    //   return {
    //     ...state,
    //     email: action.email.value,
    //     userFetch: false,
    //   }

    default:
      return state;
  }
}

export default userReducer;
