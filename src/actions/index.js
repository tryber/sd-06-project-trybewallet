import apiCurrencies from '../services';

export const SALVAR_USUARIO = 'SALVAR_USUARIO';
export const SALVAR_MOEDA = 'SALVAR_MOEDA';
export const PEGAR_CURRENCY = 'PEGAR_CURRENCY';
export const ADICIONAR_DESPESAS = 'ADICIONAR_DESPESAS';
export const APAGAR_DESPESAS = 'APAGAR_DESPESAS';
export const EDITAR_DESPESAS = 'EDITAR_DESPESAS';

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

export const adicionarDespesas = (expenses) => (
  {
    type: ADICIONAR_DESPESAS,
    expenses,
  }
);

export const apagarDespesas = (id) => (
  {
    type: APAGAR_DESPESAS,
    id,
  }
);

export const editarDespesas = (estado, despesa) => (
  {
    type: EDITAR_DESPESAS,
    estado,
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
