import { EMAIL_UPDATE } from "../actions";
import { PASSWORD_UPDATE } from "../actions";

const INITIAL_STATE = { email: '', password: '' }

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_UPDATE: 
      return ({ 
        ...state,
        email: action.email,
      });
    case PASSWORD_UPDATE:
      return ({
        ...state,
        password: action.password,
      });
    default:
      return state;
  };
};
