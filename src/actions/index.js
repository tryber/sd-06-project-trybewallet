import apiCurrencies from '../services';

export const SALVAR_USUARIO = 'SALVAR_USUARIO';
export const SALVAR_MOEDA = 'SALVAR_MOEDA';
export const PEGAR_CURRENCY = 'PEGAR_CURRENCY';
export const ADICIONAR_DESPESAS = 'ADICIONAR_DESPESAS';
export const APAGAR_DESPESAS = 'APAGAR_DESPESAS';
export const EDITAR_DESPESAS = 'EDITAR_DESPESAS';
export const SALVAR_ID_EDITAR = 'SALVAR_ID_EDITAR';

export const salvarUsuario = (usuario) => ({
  type: SALVAR_USUARIO,
  payload: usuario,
});

export const salvarMoeda = (payload) => ({
  type: SALVAR_MOEDA,
  payload,
});

export const pegarCurrency = (currencies) => ({
  type: PEGAR_CURRENCY,
  payload: currencies,
});

export const adicionarDespesas = (expense) => (
  {
    type: ADICIONAR_DESPESAS,
    expense,
  }
);

export const apagarDespesas = (id) => (
  {
    type: APAGAR_DESPESAS,
    id,
  }
);

export const salvarIdEditar = (id) => ({
  type: SALVAR_ID_EDITAR,
  id,
});

export const editarDespesas = (despesa) => (
  {
    type: EDITAR_DESPESAS,
    despesa,
  }
);

export const userApi = () => (
  async (dispatch) => {
    const aux = await apiCurrencies();
    delete aux.USDT;
    dispatch(pegarCurrency(aux));
  }
);
