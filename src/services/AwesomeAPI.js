const AwesomeAPI = () => {
  const base = 'https://economia.awesomeapi.com.br/json/';
  const data = fetch(`${base}all`)
    .then((response) => response.json());
  return data;
};

export default AwesomeAPI;
