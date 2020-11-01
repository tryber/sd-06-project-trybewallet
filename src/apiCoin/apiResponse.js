const fetchApi = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const requireApi = await fetch(URL);
  const getResponse = await requireApi.json();
  return getResponse;
};

export default fetchApi;
