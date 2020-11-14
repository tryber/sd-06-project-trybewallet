import getCoin from '../services';

export const LOGIN = 'LOGIN';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const GET_DATA = 'GET_DATA';
export const SAVE = 'SAVE';

function getData(responseJson) {
  return {
    type: GET_DATA,
    responseJson,
  };
}

export function fetchCoinData() {
  return async (dispatch) => {
    dispatch(getCoin());

    getCoin()
      .then((responseJson) => dispatch(getData(responseJson)));
  };
}

// export function fetchCoinData() {
//   return (dispatch) => {
//     getCoin()
//       .then((responseJson) => dispatch(getData(responseJson)));
//   };
// }

export function saveExpenses(expense) {
  return {
    type: SAVE,
    expense,
  };
}

export function newExpenses(expense) {
  return async (dispatch, getState) => {
    const {
      wallet: {
        expenses,
      },
    } = getState();
    const id = expenses.length;
    const exchangeRate = await getCoin();
    console.log('chamando api');
    dispatch(saveExpenses({
      ...expense,
      exchangeRate,
      id,
    }));
  };
}
