// import getApiUser from '../services/api_user';

// const USER_REQUEST = 'USER_REQUEST';
// const USER_RECEIVE = 'USER_RECEIVE';
// const USER_RECEIVE_SUCESS = 'USER_RECEIVE_SUCESS';
// const USER_RECEIVE_FAIL = 'USER_RECEIVE_FAIL';

// userRequest
// export const userRequest = () => ({
//   type: USER_REQUEST,
// });

// userReceive
// export const userReceive = () => ({
//   type: USER_RECEIVE,
//   email: 'fulano@detal.com',
// });

// userReceiveSucess
// export const userReceiveSucess = (email) => ({
//   type: USER_RECEIVE_SUCESS,
//   email,
// });

// userReceiveFail
// export const userReceiveFail = () => ({
//   type: USER_RECEIVE_FAIL,
// });

// userFetch
// export function userFetch() {
//   return async (dispatch) => {
//     dispatch(userRequest());
//     const { email } = await getApiUser();
//     dispatch(userReceiveSucess(email));
//   };
// }
