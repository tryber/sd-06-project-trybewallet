const INITIAL_STATE = {
  email: 'asd123@gmail.com',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
