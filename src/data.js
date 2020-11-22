const urlAPi = 'https://economia.awesomeapi.com.br';

const fetchApi = () => fetch(`${urlAPi}/json/all`)
  .then((response) => response.json());

export default fetchApi;
