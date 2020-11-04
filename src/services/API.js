export async function fetchAPI() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((res) => res.json());
  return response;
}
