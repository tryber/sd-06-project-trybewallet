// Coloque aqui suas actions
import getCoin from '../services';

export const LOGIN = 'LOGIN';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const GET_DATA = 'GET_DATA';
export const SAVE = 'SAVE';
export const ID_INCREMENT = 'ID_INCREMENT';
export const TOTAL_FIELD = 'TOTAL_FIELD';
export const CURRENCIES = 'CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EXCHANGE_DATA = 'EXCHANGE_DATA';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const REPLACE_EXPENSE = 'REPLACE_EXPENSE';

function getData(responseJson) {
  return {
    type: GET_DATA,
    responseJson,
  };
}

export function fetchCoinData() {
  return async (dispatch) => {
    getCoin()
      .then((responseJson) => dispatch(getData(responseJson)));
  };
}

export function incrementaId() {
  return {
    type: ID_INCREMENT,
  };
}

export function saveExpenses(expense) {
  return {
    type: SAVE,
    expense,
  };
}

export function totalField(expense) {
  return {
    type: TOTAL_FIELD,
    expense,
  };
}

export const currenciesApi = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

export const exchangeData = (exchangeRates) => ({
  type: EXCHANGE_DATA,
  exchangeRates,
});

export const deleteExpense = (expense) => ({ //-------------------------------------
  type: 'DELETE_EXPENSE',
  expense,
  // endValue,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
  isEditing: true,
});

export const replaceExpense = (expense) => ({
  type: REPLACE_EXPENSE,
  expense,
});

// });
// export function getCurrency() {
//   const currencies = fetchCoinData;
//   dispatch(currencies);
// }

// export const getCurrencyAPI = () => async (dispatch) => {
//   const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const currencies = await responseAPI.json();
//   dispatch(currenciesAPI(currencies));
// };

// export function newExpenses(expense) {
//   return async (dispatch) => {
//     dispatch(saveExpenses({
//       ...expense,
//       // exchangeRate,
//     }));
//     // dispatch(fetchCoinData());
//     dispatch(incrementaId());
//     dispatch(totalField(expense));
//   };
// }
export function newExpense(expense) {
  return async (dispatch) => {
    const exchangeRates = await getCoin();

    dispatch(saveExpenses({
      ...expense,
      exchangeRates,
    }));
    // dispatch(fetchCoinData());
    dispatch(incrementaId());
    dispatch(totalField(expense));
  };
}
