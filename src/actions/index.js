export const userLogin = (userEmail) => ({
  type: 'USER_EMAIL',
  payload: userEmail,
});

export const moedasApi = (currencies) => ({
  type: 'GET_MOEDAS',
  payload: currencies,
});

export const expensesAdd = (expenses) => ({
  type: 'ADD_EXPENSES',
  payload: expenses,
});

export const fetchApiCurrencies = () => async (dispatch) => {
  const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
  const moedas = await apiResponse.json();
  dispatch(moedasApi(moedas));
};

export function getExpensesAPI(expenseInfo) {
  return async (dispatch) => {
    const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await responseAPI.json();
    const expense = { ...expenseInfo, exchangeRates: currencies };
    dispatch(expensesAdd(expense));
  };
}
