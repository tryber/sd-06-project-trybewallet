function fetchApi() {
  const urlAPi = 'https://economia.awesomeapi.com.br/json/all';
  fetch(urlAPi)
    .then((response) => response.json())
    .then((data) => ([data]));
}

export default fetchApi;
