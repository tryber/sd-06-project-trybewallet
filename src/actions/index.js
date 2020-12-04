import getCurrencyList from '../services/currencyAPI';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCY = 'ADD_CURRENCY';
export const FETCHING_LIST = 'FETCHING_LIST';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const emailLogin = (value) => ({ type: LOGIN, value });

export const addExpense = (value) => ({ type: ADD_EXPENSE, value });

export const addCurrency = (value) => ({ type: ADD_CURRENCY, value });

export const fetchingList = (value) => ({ type: FETCHING_LIST, value });

export const editingExpense = (value) => ({ type: EDITING_EXPENSE, value });

export const removeExpense = (value) => ({ type: REMOVE_EXPENSE, value });

export const editExpense = (value) => ({ type: EDIT_EXPENSE, value });

export const fetchCurrencyList = () => (
  async (dispatch) => {
    dispatch(fetchingList());

    const currencyList = await getCurrencyList('USDT');
    dispatch(addCurrency(currencyList));
  }
);

export const dispatchExpense = (value) => (
  async (dispatch) => {
    const currencyList = await getCurrencyList('USDT');
    await dispatch(addExpense({
      ...value,
      exchangeRates: currencyList,
    }));
  }
);
