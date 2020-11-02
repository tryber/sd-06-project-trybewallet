import { IS_SUCCESS, ADD_EXPENSE, DEL_ITEM } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case IS_SUCCESS:
    return { ...state, currencies: [...Object.keys(action.currencies)] };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expenseArray, exchangeRates: { ...action.rates } },
      ],
    };
  case DEL_ITEM:
    return {
      ...state,
      expenses: state.expenses.filter((item, index) => index !== action.id),
    };
  default:
    return state;
  }
}
