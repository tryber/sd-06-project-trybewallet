import getAllCurrencies from '../services/currenciesAPI';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const RECEIVE_CURRENCY_OK = 'RECEIVE_CURRENCY_OK';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const resquestCurrencyOk = (currencies) => ({
  type: RECEIVE_CURRENCY_OK,
  currencies,
});

export const currenciesThunk = () => (dispatch) => {
  getAllCurrencies()
    .then((currencies) => dispatch(resquestCurrencyOk(currencies)));
};

// como visto no plantão do Ícaro (30/10/2020):
export const expensesThunk = (expense) => async (dispatch) => {
  const apiResponse = await getAllCurrencies();
  const upExpense = { ...expense, exchangeRates: apiResponse };
  dispatch(addExpenses(upExpense));
};

// export function currenciesThunk() {
//   return (dispatch) => getAllCurrencies()
//     .then(
//       (json) => dispatch(resquestCurrencyOk(json)),
//       (error) => dispatch(requestCurrencyFail(error.message)),
//     );
// }
