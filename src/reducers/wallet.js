import { IS_SUCCESS, ADD_EXPENSE, RATES_SUCCESS, RATES_REQUEST } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  isFetching: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case IS_SUCCESS:
    return { ...state, currencies: [...Object.keys(action.currencies)] };
  case ADD_EXPENSE:
    if (state.isFetching === false) {
      return {
        ...state,
        expenses: [...state.expenses, { ...action.expenseArray, exchangeRates: action.rates }],
      }
    } else {
      return state
    }
  case RATES_REQUEST: 
    return {
      ...state, isFetching: true,
    }
  case RATES_SUCCESS:
    return {
      ...state, isFetching: false,
    }
  default:
    return state;
  }
}
