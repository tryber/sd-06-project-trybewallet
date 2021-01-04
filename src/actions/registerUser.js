import { SAVE_USER } from './actionTypes';

function registerUser(userName) {
  const action = {
    type: SAVE_USER,
    userName,
  };
  return action;
}

export default registerUser;
