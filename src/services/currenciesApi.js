const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = () => (
  fetch(API_URL).then((response) => response.json())
);

export default fetchApi;
