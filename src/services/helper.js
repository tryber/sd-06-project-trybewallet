export const paymentOpt = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

export const categoryOpt = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export const tableColumn = [
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

export const handleValue = (value) => Math.round(value * 100) / 100;
