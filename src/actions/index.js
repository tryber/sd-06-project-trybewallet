// Coloque aqui suas actions
// actions sao objetos com chave type
// mas aqui sao functions que retornam objetos
export const login = (email) => ({
    type: 'LOGIN',
    email,
})

export const wallet = (expenses) => ({
    type: 'ATT_EXPENSES',
    expenses,
})

export const currency = (currencies) => ({
    type: 'ATT_CURRENCIES',
    currencies,
})

export const feaction = (exchangeRatesJson) => ({
    type: 'ATT_EXCHANGERATES',
    exchangeRatesJson,
})

export const fetchData = () => async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    dispatch(feaction(currencies));
  };
