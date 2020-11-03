export const LOGIN = 'LOGIN';
export const SUCCESS = 'SUCCESS';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

const getCurrency = (payload) => ({
  type: SUCCESS,
  payload,
});

const getExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const fetchingCurrenciesThunk = () => {
  return (dispatch) => {
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then(response => response.json()
        .then((data) => dispatch(getCurrency(data))
      ));
  }
}

export const addExpensesThunk = (userExpenses) => {
  return (dispatch, getState) => {
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then(response => response.json()
        .then(moneyReturned => {
          let idExpenses = 0;
          let expensesState = getState().wallet.expenses;
          if(expensesState.length === 0) {
            idExpenses = 0;
          } else {
            idExpenses = (expensesState[expensesState.length - 1].id) + 1;
          }
          let allExpenses = { ...userExpenses, id: idExpenses, exchangeRates: moneyReturned }
          dispatch(getExpenses(allExpenses));
        })
      );
  }
}
