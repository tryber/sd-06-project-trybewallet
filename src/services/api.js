const urlAPI = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = () => (
  fetch(urlAPI)
    .then((response) => response.json())
    .catch((error) => error)
);

export default fetchAPI;
