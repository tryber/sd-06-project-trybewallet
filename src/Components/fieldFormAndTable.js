// Metodos de pagamentos
export const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

// Categoria TAG para desespesa
export const tagExpenses = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

// Tabela de Gastos
export const expenseTable = [
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
