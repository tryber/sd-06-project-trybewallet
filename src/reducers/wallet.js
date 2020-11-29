import types from '../services/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.RESPONSE:
    return {
      ...state,
      currencies: Object.keys(action.prices),
      // expenses: action.prices,
    };
  case types.DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => (item.id !== action.id)),
    };
  case types.EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        {
          ...action.objExpenses,
          exchangeRates: action.objApi,
        },
      ],
    };
  default:
    return state;
  }
}

// case 'SEARCH_SUCCESS':
//   return { ...state, currencies };
// case 'SEARCH_FAIL':
//   return { ...state, error };
// case types.REQUEST:
//   return {
//     ...state,
//   };
