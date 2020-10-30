const INITIAL_STATE = { emailA: '' };
const LOGIN = 'LOGINA';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return ({ email: action.email });
  default:
    return state;
  }
};

export default wallet;
