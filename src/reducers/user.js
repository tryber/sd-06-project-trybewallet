const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, { type, value }) {
  switch (type) {
  case 'LOGIN':
    return { email: value };
  default:
    return state;
  }
}

export default user;
