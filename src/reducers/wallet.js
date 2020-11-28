import { ADD_EXPENSE, ADD_CURRENCY, FETCHING_LIST } from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [], fetchingList: false };

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case ADD_CURRENCY:
    return {
      ...state,
      currencies: [action.value],
      fetchingList: false,
    };
  case FETCHING_LIST:
    return {
      ...state,
      fetchingList: true,
    };
  default:
    return state;
  }
}

export default walletReducer;
