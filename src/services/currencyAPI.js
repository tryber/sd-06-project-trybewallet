async function getCurrencyList(remove) {
  const returnedList = await fetch('https://economia.awesomeapi.com.br/json/all');
  const fullList = await returnedList.json();
  delete fullList[`${remove}`];

  return fullList;
}

export default getCurrencyList;
