import { SAVELOGIN } from "../actions";

const INITIAL_STATE = {
  email: '',
};

 export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVELOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};
