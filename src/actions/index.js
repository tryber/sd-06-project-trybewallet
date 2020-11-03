const currencyCode = (code) => ({ type: 'CURRENCY', code });

export const expenseAction = (expense) => ({
  type: 'EXPENSES',
  expense,
});

export function fetchApi() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const currResponse = await fetch(endpoint);
    const currJson = await currResponse.json();
    dispatch(currencyCode(currJson));
  };
}

export const action = (value) => ({ type: 'EMAIL', value });
