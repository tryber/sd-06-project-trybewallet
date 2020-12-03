// Coloque aqui suas actions
export function selectUser(email) {
  return {
    type: 'ADD_USER',
    payload: {
      email,
    },
  };
}

export function selectWallet(expenses, currencies) {
  return {
    type: 'ADD_WALLET',
    payload: {
      expenses,
      currencies,
    },
  };
}

export function uptExpenses(expenses) {
  return {
    type: 'EXPENSES',
    expenses,
  };
}

export function selectEditar(editar) {
  return {
    type: 'EDITAR',
    payload: {
      editar,
    },
  };
}

export function updateId(id) {
  return {
    type: 'ID',
    id,
  };
}

export function fetchCurrency(form, currencyName) {
  const { contador, id, value, description, tag, currency, method } = form;
  return async (dispatch) => {
    const soma = contador + 1;
    dispatch(updateId(soma));
    try {
      const currencys = await fetch('https://economia.awesomeapi.com.br/json/all');
      const jsonCurrencys = await currencys.json();
      delete jsonCurrencys.USDT;
      const result = {
        id, value, description, currency, method, tag, exchangeRates: jsonCurrencys };
      dispatch(selectWallet(result, currencyName));
    } catch (error) {
      dispatch('ERROR');
    }
  };
}
