export const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

export const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export const tableHeader = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

export const formatValue = (value) => Math.round(value * 100) / 100;
