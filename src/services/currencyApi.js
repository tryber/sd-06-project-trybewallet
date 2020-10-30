function fetchApiData() {
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(ENDPOINT)
    .then((response) => response.json());
}

export default fetchApiData;
