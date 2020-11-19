import types from '../services/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  // expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action) {
  // case 'SEARCH_SUCCESS':
  //   return { ...state, currencies };
  // case 'SEARCH_FAIL':
  //   return { ...state, error };
  // case types.REQUEST:
  //   return {
  //     ...state,
  //   };
  case types.RESPONSE:
    return {
      ...state,
      currencies: action.prices,
      // expenses: action.expenses,
    };
  default:
    return state;
  }
}
