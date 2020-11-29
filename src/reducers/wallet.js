import types from '../services/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  btnEdit: false,
  elementEdit: {},
};

export default function wallet(state = INITIAL_STATE, action) {
  const index = (action.type === types.EDIT_EXPENSE)
    ? state.expenses.findIndex((item) => (item.id === action.objExpenses.id))
    : 0;
  const newExpenses = [...state.expenses];
  newExpenses[index] = action.objExpenses;
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
  case types.EDIT_EXPENSE:
    return {
      ...state,
      expenses: newExpenses,
      btnEdit: false,
    };
  case types.EDIT_BTN:
    return {
      ...state,
      btnEdit: action.toogle,
      elementEdit: action.objExpenses,
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

// case types.EDIT_EXPENSE:
//   return {
//     ...state,
//     expenses: [...state.expenses.filter((item) => (item.id !== action.objExpenses.id)),
//       {
//         ...action.objExpenses,
//       }],
//     btnEdit: false,
//   };

// case types.EDIT_EXPENSE:
//   return {
//     ...state,
//     expenses: state.expenses.findIndex((item) => (item.id === action.objExpenses.id)),
//     btnEdit: false,
//   };
