// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCIES, ADD_EXPENSE } from '../actions/wallet';

const initialState = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
};

export default function (state = initialState, action) {
  const { totalExpense } = { ...state };
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.expense }],
      totalExpense:
      totalExpense + (Number(action.expense.value)
      * action.expense.exchangeRates[action.expense.currency].ask),
    };
  default:
    return state;
  }
}
