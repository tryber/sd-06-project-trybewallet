import fetchAPI from '../services/mockAPI';
export const EMAIL = 'EMAIL';
export const CURRENCY = 'CURRENCY';

export const loginAction = (payload) => ({
  type: EMAIL,
  payload,
});

// export const fetchAction = (payload) => ({
//   type: CURRENCY,
//   payload
// })

// export const currencyThunk = () => {
//   return async (dispatch) => {
//     const request = fetchAPI();
//     return dispatch(fetchAction(request));
//   }
// }
