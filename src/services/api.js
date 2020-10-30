const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = () => {
  const answerApi = fetch(APIURL)
    .then((response) => (response.json));
  return answerApi;
};

export default fetchApi;
