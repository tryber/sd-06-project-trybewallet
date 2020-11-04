const fetchApi = () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => (response.json()));

  export default fetchApi;