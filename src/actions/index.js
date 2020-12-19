export const LOGIN = 'LOGIN';
export const FETCH_EXCHANGECURRENCIES = 'FETCH_EXCHANGECURRENCIES';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const fetchExchangeCurrencies = (currencies) => ({
  type: FETCH_EXCHANGECURRENCIES,
  currencies,
});

export const addNewExpense = (expenses) => ({
  type: ADD_NEW_EXPENSE,
  expenses,
});

export function thunkAddNewExpense(expenses, total) {
  return (dispatch) => (
    dispatch(addNewExpense(expenses, total))
  );
}

export function fetchExchangeRateAPI() {
  return ((dispatch) => (
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => {
        delete currencies.USDT;
        return dispatch(fetchExchangeCurrencies(currencies));
      })
  ));
}
