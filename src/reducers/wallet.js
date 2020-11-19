import {
  CURRENCIES_FETCH,
  SAVE_EXPENSES,
  DELETE_EXPENSES,
  EDIT_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES_FETCH:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSES: {
    // console.log(action.expense);
    const find = state.expenses.find((exp) => exp.id === action.expense.id);
    const newExpense = { ...find, ...action.expense };
    // console.log(find);
    // console.log(newExpense);
    const newArray = [...state.expenses];
    // console.log(newArray);
    newArray.splice(state.expenses.indexOf(find), 1, newExpense);
    // console.log(newArray.splice((find.id), 1, newExpense));
    return { ...state,
      expenses: newArray };
  }
  default:
    return state;
  }
}
