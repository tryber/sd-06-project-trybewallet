// import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function handleStoreUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
