import getApi from '../services/ServicesApi';

export const LOGIN = 'LOGIN';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';

export const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

export const fetchingCurrencies = () => (dispatch) => {
  getApi().then((moedas) => {
    dispatch(fetchCurrenciesSuccess(moedas));
  });
};

export const EXPENSES_SAVE = 'EXPENSES_SAVE';

export const expensesSave = (expenses) => ({
  type: EXPENSES_SAVE,
  expenses,
});

export const ADDTOTAL = 'ADDTOTAL';

export const addTotal = (total) => ({
  type: ADDTOTAL,
  total,
});

export const DELETE_ITEM = 'DELETE_ITEM';

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  id,
});

export function fetchingSaveExpense(expenses) {
  return async (dispatch) => {
    const apiResponse = await getApi();
    const newExpense = { ...expenses, exchangeRates: apiResponse }; // junção do que foi digitado com a api e a chave denominada conforme requisito
    (dispatch(expensesSave(newExpense)));
  };
}

// action é um objeto com a propriedade type e qualquer outro tipo de valor que queira passar aqui
// As actionCreate são funções que retornam um objeto - a action de api é uma exceçao
// o dispatch recebe por parametro uma action
// neste arquivo ficara as funções que retornam a action, quando eu chamo a função retorna o objeto
