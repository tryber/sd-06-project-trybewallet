export const newEmail = (value) => ({
  type: 'NEW_USER',
  value,
});

export const delEmail = (value) => ({
  type: 'REMOVE_USER',
  value,
});

export const newExpenses = (payload) => ({
  type: 'NEW_EXPENSES',
  payload,
});

export const fetchCurrencies = (coin) => ({
  type: 'FETCH_CURRENCIES_SUCCESS',
  coin,
});

export const deleteExpenses = (despesa) => ({
  type: 'DELETE_EXPENSE',
  despesa,
});

export function apiMoney() {
  return async (dispatch) => {
    const moneyResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const cotacaoMoeda = await moneyResponse.json();

    dispatch(fetchCurrencies(cotacaoMoeda));
  };
}

export function newFetch(expensesInfo) {
  return async (dispatch) => {
    const getCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await getCurrencies.json();
    const allExpenses = { ...expensesInfo, exchangeRates: currencies };
    dispatch(newExpenses(allExpenses));
  };
}
