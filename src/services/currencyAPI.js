const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br/json';

const getCurrency = async () => {
  const endpoint = '/all';
  const fetchResponse = await fetch(CURRENCY_BASE_API + endpoint);
  const responseCurrency = await fetchResponse.json();
  return responseCurrency;
};

export default getCurrency;
