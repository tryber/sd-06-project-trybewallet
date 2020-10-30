import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = { wallet: { currencies: [], expenses: [] } };

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      wallet: {
        ...state.wallet,
        expenses: [...state.wallet.expenses, action.payload.value],
      },
    };
  default:
    return state;
  }
}

export default userReducer;
