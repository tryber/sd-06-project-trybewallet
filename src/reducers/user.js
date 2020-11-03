const { LOGIN_USER } = require('../actions');

const GET_INITIAL_STATE = {
  email: '',

};

const user = (state = GET_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
