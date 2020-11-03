import fetchApi from '../services';

export const CADASTRO_SAVE_EMAIL = 'CADASTRO_SAVE_EMAIL';
export const saveEmail = (email) => ({
  type: CADASTRO_SAVE_EMAIL,
  email,
});

export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export function addExpense({
  value,
  description,
  currency,
  method,
  tag,
}) {
  return async (dispatch, getState) => {
    const obj = await fetchApi();
    // console.log('getState', getState());
    return dispatch({
      type: SAVE_EXPENSE,
      id: getState().wallet.expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: obj,
    });
  };
}
