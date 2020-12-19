import fetchAPI from '../services/api';
import { addExpense } from './addExpense';

function fecthExpense(userExpense) {
  return async (dispatch, getState) => {
    const api = await fetchAPI();
    const { expenses } = getState().wallet;
    const id = expenses.length > 0 ? (expenses[expenses.length - 1].id + 1) : 0;
    const expense = { ...userExpense, id, exchangeRates: api };
    dispatch(addExpense(expense));
  };
}

export default fecthExpense;
