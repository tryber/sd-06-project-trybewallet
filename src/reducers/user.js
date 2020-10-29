// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NEW_USER:
      return {... state, email: action.value};
    case REMOVE_USER:
      return { ... state, ...state.user.email.filter() - action.value};
    default:
      return state;
  };
};

export default userReducer;