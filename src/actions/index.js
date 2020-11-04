const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';
const RMV_EXPENSE = 'RMV_EXPENSE';

const signIn = (email) => ({ type: LOGIN, email });

const addExpense = (state) => {
  const { id, value, currency, method, tag, description, exchangeRates } = state;
  return ({
    type: ADD_EXPENSE,
    expense: { id, value, currency, method, tag, description, exchangeRates },
  });
};

const rmvExpense = (state) => {
  const { id, value, currency, method, tag, description, exchangeRates } = state;
  return ({
    type: RMV_EXPENSE,
    expense: { id, value, currency, method, tag, description, exchangeRates },
  });
};

export { signIn, addExpense, rmvExpense };
