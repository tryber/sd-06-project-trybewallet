export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';
export const REQUEST_RATES = 'REQUEST_RATES';
export const GET_RATES = 'GET_RATES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SEND_TO_GLOBAL_STATE = 'SEND_TO_GLOBAL_STATE';
export const SEND_TOTAL_VALUE = 'SEND_TOTAL_VALUE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const emailLogin = (email) => ({
  type: EMAIL, email,
});

export const passwordLogin = (password) => ({
  type: PASSWORD, password,
});

function requestRates() {
  return { type: REQUEST_RATES };
}

function getRateList(json) {
  return { type: GET_RATES, payload: json };
}

const failedRequest = (error) => ({
  type: FAILED_REQUEST, payload: error,
});

export function getRates() {
  return (dispatch) => {
    dispatch(requestRates()); // muda isFetching pra true

    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json()) // faz a requisição
      .then(
        (json) => dispatch(getRateList(json)),
        (error) => dispatch(failedRequest(error)),
      );
  };
}

export function sendExpenseToGlobalState(expense) {
  return { type: SEND_TO_GLOBAL_STATE, payload: expense };
}

export function sendTotalValue(totalValue) {
  return { type: SEND_TOTAL_VALUE, payload: totalValue };
}

export function deleteExpense(expenseId) {
  return { type: DELETE_EXPENSE, payload: expenseId };
}
