const fetchApi = async () => {
  const api = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await api.json();
  return data;
};

export default fetchApi;
