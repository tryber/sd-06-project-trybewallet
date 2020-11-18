export const LOGIN = 'LOGIN';
export const SELECTCURRENCY = 'SELECTCURRENCY';
export const ADDEXPENSE = 'ADDEXPENSE';

export function login(email) {
  return {
    type: LOGIN,
    email,
  };
}

export function actionSelectCurrency(currency) {
  return {
    type: SELECTCURRENCY,
    currency,
  };
}

export function addExpense(expense) {
  return {
    type: ADDEXPENSE,
    expense,
  };
}

export function fetchCurrency() {
  return async (dispatch) => {
    const infoAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const infoJSON = await infoAPI.json();
    dispatch(actionSelectCurrency(infoJSON));
  };
}
