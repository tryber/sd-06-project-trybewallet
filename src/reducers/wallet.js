const INITIAL_STATE = { email: '' };
const ADD_EXPENSE = 'ADD_EXPENSE';

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      wallet: {
        ...wallet,
        expenses: [...expenses, action.payload.value],
      },
    };
  default:
    return state;
  }
}

export default userReducer;
