import Api from '../services/currencisAPI';

export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const GET_OBJE = 'GET_OBJE';
export const REQUEST_OBJE = 'REQUEST_OBJE';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  email,
});

export const saveExpenses = (expense) => ({
  type: SAVE_EXPENSES,
  expense,
});

function getApi(json) {
  return { type: GET_OBJE, payload: json };
}

function requestObj() {
  return { type: REQUEST_OBJE };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function fetchObj() {
  return (dispatch) => {
    dispatch(requestObj());
    return Api()
      .then(
        (json) => dispatch(getApi(json)),
        (error) => dispatch(failedRequest(error.message)),
      );
  };
}
