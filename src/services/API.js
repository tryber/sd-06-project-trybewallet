export async function fetchCurrency() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then(res => res.json())
    .then(res => res)
  return response;
}
