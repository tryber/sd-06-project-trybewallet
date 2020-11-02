export const userLogin = (userEmail) => ({
  type: 'USER_EMAIL',
  payload: userEmail,
});

export const currenciesAPI = (currencies) => ({
  type: 'CURRENCIES',
  payload: currencies,
});

export const expensesAdd = (expenses) => ({
  type: 'ADD_EXPENSES',
  payload: expenses,
});

export const getCurrencyAPI = () => async (dispatch) => {
  const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseAPI.json();
  dispatch(currenciesAPI(currencies));
};

export function getExpensesAPI(expenseInfo) {
  return async (dispatch) => {
    const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await responseAPI.json();
    const expense = { ...expenseInfo, exchangeRates: currencies };
    dispatch(expensesAdd(expense));
  };
}
