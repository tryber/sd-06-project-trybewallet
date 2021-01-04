import { SAVE_EXPENSE } from './actionTypes';

function sendExpenseToStore(expenseData, convertedBRLExpense) {
  const action = {
    type: SAVE_EXPENSE,
    payload: {
      expenseData,
      convertedBRLExpense,
    },
  };
  return action;
}

function saveExpense(expense) {
  return async (dispatch) => {
    const requestResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await requestResponse.json();
    // Expense conversion
    const { value, currency } = expense;
    const { [currency]: { ask } } = exchangeRates;
    const convertedBRLExpense = (
      Math.round(parseFloat(value) * parseFloat(ask) * 100)
    ) / 100;
    const expenseData = { ...expense, exchangeRates };
    dispatch(sendExpenseToStore(expenseData, convertedBRLExpense));
  };
}

export default saveExpense;
