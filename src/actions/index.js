import fetchApi from '../apiCoin/apiResponse';

export const ADD_USER = 'ADD_USER';
export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const ADD_USER_EXPENSES = 'ADD_USER_EXPENSES';

export const addUser = (email) => ({ type: ADD_USER, email });

export const addExpenses = (expenses) => ({
  type: ADD_USER_EXPENSES,
  expenses,
});

export const requestForData = () => ({
  type: REQUEST_API,
});

export const receivedResponse = (currenciesValue) => ({
  type: RECEIVE_RESPONSE,
  currencies: currenciesValue,
});

export function addExpenseThunk(expense) {
  return async (dispatch) => {
    const receivedObj = await fetchApi();
    const addedExpense = { ...expense, exchangeRates: receivedObj };
    dispatch(addExpenses(addedExpense));
  };
}

export function getApiThunk() {
  return async (dispatch) => {
    dispatch(requestForData());

    const getObj = await fetchApi();
    const {
      USD, CAD, EUR, GBP, ARS,
      BTC, LTC, JPY, CHF, AUD,
      CNY, ILS, ETH, XRP,
    } = getObj;
    const codeCoin = [
      USD, CAD, EUR, GBP, ARS,
      BTC, LTC, JPY, CHF, AUD,
      CNY, ILS, ETH, XRP,
    ];
    dispatch(receivedResponse(codeCoin));
  };
}
// Coloque aqui suas actions
