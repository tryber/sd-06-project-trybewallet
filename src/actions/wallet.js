import fetchCurrencies from '../services';

export const EXPENSES = 'EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

const walletData = ({ value, description, currency, method, tag, exchangeRates }) => ({
  type: EXPENSES,
  payload: {
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  },
});

export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

const sendCurrencies = (currencies) => ({
  type: LOAD_CURRENCIES,
  payload: {
    currencies,
  },
});

export function requestCurrencies() {
  return (
    async (dispatch) => {
      const currenciesApi = await fetchCurrencies();
      const currenciesKey = Object.keys(currenciesApi);
      const currenciesFilter = currenciesKey.filter((currency) => currency !== 'USDT');
      dispatch(sendCurrencies(currenciesFilter));
    }
  );
}

export function createExpense({ value, description, currency, method, tag }) {
  return (
    async (dispatch) => {
      const exchangeRates = await fetchCurrencies();
      dispatch(walletData({ value, description, currency, method, tag, exchangeRates }));
    }
  );
}

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const saveEditExpense = ({
  idExpenseEdit,
  value,
  description,
  currency,
  method,
  tag }) => ({
  type: EDIT_EXPENSE,
  idExpenseEdit,
  value,
  description,
  currency,
  method,
  tag,
});

console.log('Objeto ação editar:', saveEditExpense);

// export function editExpense({ id, tag, description, currency, method, value }) {
//   return (
//     async (dispatch) => {
//       const exchangeRates = await fetchCurrencies();
//       dispatch(saveEditExpense({
//         id, tag, description, currency, method, value, exchangeRates,
//       }));
//     }
//   );
// }
