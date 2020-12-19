// import getApiWallet from '../services/api_wallet';

// const WALLET_REQUEST = 'WALLET_REQUEST';
// const WALLET_RECEIVE = 'WALLET_RECEIVE';
// const WALLET_RECEIVE_SUCESS = 'WALLET_RECEIVE_SUCESS';
// const WALLET_RECEIVE_FAIL = "WALLET_RECEIVE_FAIL";

// walletRequest
// export const walletRequest = () => ({
//   type: WALLET_REQUEST,
// });

// walletReceive
// export const walletReceive = () => ({
//   type: WALLET_RECEIVE,
//   currencies: [],
//   expenses: [],
// });

// walletReceiveSucess
// export const walletReceiveSucess = (currencies, expenses) => ({
//   type: WALLET_RECEIVE_SUCESS,
//   currencies: [value],
//   expenses: [value],
// });

// walletReceiveFail
// export const walletReceiveFail = () => ({
//   type: WALLET_RECEIVE_FAIL,
// });

// walletFetch
// export function walletFetch() {
//   return async (dispatch) => {
//     dispatch(walletRequest());
//     const { currencies, expenses } = await getApiWallet();
//     dispatch(walletReceiveSucess(currencies, expenses));
//   };
// }
