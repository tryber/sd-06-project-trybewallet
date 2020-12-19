export const LOGIN = 'LOGIN';
export const login = (email) => ({
  type: LOGIN,
  email,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const currenciesApi = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const ADD_EXPENSES = 'ADD_EXPENSES';
export const expensesAdd = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const fetchApiCurrencies = () => async (dispatch) => {
  const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await apiResponse.json();
  dispatch(currenciesApi(currencies));
};

export function getExpensesAPI(expenseInfo) {
  return async (dispatch) => {
    const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await responseAPI.json();
    const expense = { ...expenseInfo, exchangeRates: currencies };
    dispatch(expensesAdd(expense));
  };
}
