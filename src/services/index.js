const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = () => (
  fetch(`${API_URL}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))));

export default fetchAPI;
