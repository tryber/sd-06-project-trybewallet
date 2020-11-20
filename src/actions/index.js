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
export const EXCHANGE_DATA = 'EXCHANGE_DATA';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const IS_EDITING = 'IS_EDITING';

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

export function totalField() {
  return {
    type: TOTAL_FIELD,
  };
}

export function deleteExpense({ id }) {
  return {
    type: DELETE_EXPENSE,
    id,
  };
}

export const exchangeData = (exchangeRates) => ({
  type: EXCHANGE_DATA,
  exchangeRates,
});

export const editExpenses = (expenses) => ({
  type: EDIT_EXPENSE,
  expenses,
});

export const changeEdit = (expense) => ({
  type: IS_EDITING,
});

export function newExpenses(expense) {
  return async (dispatch) => {
    const exchangeRates = await getCoin();

    dispatch(saveExpenses({
      ...expense,
      exchangeRates,
    }));
    // dispatch(fetchCoinData());
    dispatch(incrementaId());
    dispatch(totalField());
  };
}

// export function updateExpenses(expenses) {
  //   return async (dispatch) => {
    //     const exchangeRates = await getCoin();
    // dispatch(editExpenses(expenses));
    
//     dispatch(saveExpenses({
//       ...expense,
//       exchangeRates,
//     }));
//   
//     dispatch(totalField(expense));
//   };
// }
