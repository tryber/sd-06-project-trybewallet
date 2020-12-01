export const LOGIN = 'LOGIN';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const CURRENCY = 'CURRENCY';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';

export function user({ email }) {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
}

function expenseUpdater({ value, description, currency, method, tag, exchangeRates }) {
  return {
    type: CREATE_EXPENSE,
    payload: {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    },
  };
}

export function updateExpenses({ value, description, currency, method, tag }) {
  return (
    async (dispatch) => {
      const endpoint = 'https://economia.awesomeapi.com.br/json/all';
      const fetchEndpoint = await fetch(endpoint);
      const exchangeRates = await fetchEndpoint.json();
      dispatch(expenseUpdater({
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      }));
    }
  );
}
