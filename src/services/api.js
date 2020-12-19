const get = async () => {
  const resp = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = resp.json();

  return data;
};

export default get;
