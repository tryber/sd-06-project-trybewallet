import currenciesFetcher from '../services/currenciesFetcher';

export const LOADING_CURRENCIES = 'LOADING_CURRENCIES';
export const CURRENCIES_LOADED = 'CURRENCIES_LOADED';
export const NEW_CURRENCY_SELECTED = 'NEW_CURRENCY_SELECTED';
export const NEW_PAYMENT_METHOD = 'NEW_PAYMENT_METHOD';
export const NEW_SELECTED_TAG = 'NEW_SELECTED_TAG';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const NEW_VALUE_SPENT = 'NEW_VALUE_SPENT';
export const NEW_DESCRIPTION = 'NEW_DESCRIPTION';
export const TOTAL_MONEY_SPENT = 'TOTAL_MONEY_SPENT';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EXPENSE_EDIT = 'EXPENSE_DELETE';
export const NOW_EDITING_EXPENSE = 'NOW_EDITING_EXPENSE';
export const UPDATE_STATE = 'UPDATE_STATE';

export function newCurrencySelected(selectedCurrency) {
  return { type: NEW_CURRENCY_SELECTED, selectedCurrency };
}

export function newPaymentMethod(paymentMethod) {
  return { type: NEW_PAYMENT_METHOD, paymentMethod };
}

export function newSelectedTag(newTag) {
  return { type: NEW_SELECTED_TAG, newTag };
}

function newExpense(currentCotation) {
  return { type: NEW_EXPENSE, currentCotation };
}

function loadingCurrencies() {
  return { type: LOADING_CURRENCIES };
}

export function newValueSpent(moneySpent) {
  return { type: NEW_VALUE_SPENT, moneySpent };
}

export function newDescription(description) {
  return { type: NEW_DESCRIPTION, description };
}

export function updateStateWithEditedItem(id) {
  return { type: UPDATE_STATE, id };
}

export function nowEditingExpense(id) {
  return { type: NOW_EDITING_EXPENSE, id };
}

function currenciesLoaded(response) {
  const currencies = [response];
  return { type: CURRENCIES_LOADED, currencies };
}

export function expenseDeleter(id) {
  return { type: DELETE_EXPENSE, id };
}

export function expenseEditor() {
  return { type: EXPENSE_EDIT };
}

export function totalMoneySpent(expenses) {
  let valores = [];
  let cotations = [];
  let total = 0;
  if (expenses.length > 0) {
    cotations = expenses.map((item) => (
      parseFloat(item.exchangeRates[item.currency].ask)
    ));
    valores = expenses.map((item) => (parseFloat(item.value)));
    valores = valores.map((item, index) => (item * cotations[index]));
    total = valores.reduce((a, b) => a + b);
    total = total.toFixed(2);
  }
  return { type: TOTAL_MONEY_SPENT, total };
}

export const currenciesFetcherThunk = () => {
  console.log('irineu');
  return (dispatch) => {
    dispatch(loadingCurrencies());
    return currenciesFetcher().then(
      (r) => dispatch(currenciesLoaded(r)),
    );
  };
};

export function newExpenseThunk() {
  console.log('irineu');
  return (dispatch) => {
    console.log('irineu');
    return currenciesFetcher().then(
      (r) => dispatch(newExpense(r)),
    );
  };
}
