// Coloque aqui suas actions
// actions sao objetos com chave type
// mas aqui sao functions que retornam objetos
export const login = (email) => ({
	type: 'LOGIN',
	email,
});

export const currency = (currencies) => ({
	type: 'ATT_CURRENCIES',
	currencies,
});

export const feaction = (exchangeRates, expenses) => ({
	type: 'ATT_EXCHANGERATES',
	exchangeRates,
	expenses,
});

export const fetchData = (expenses) => async (dispatch) => {
	const response = await fetch('https://economia.awesomeapi.com.br/json/all');
	const exchangeRates = await response.json();
	dispatch(feaction(exchangeRates, expenses));
};

export const buttonDell = (line) => ({
	type: 'DELL_CURRENCY',
	line,
});
