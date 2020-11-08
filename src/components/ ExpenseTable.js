import React, { Component } from 'react';

class ExpensesTable extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
          </tr>

        </thead>
      </table>
    );
  }
}
export default ExpensesTable;

//   * A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave ***expenses*** que vem do reducer `wallet`.

//     * O campo de Moeda e Moeda de Conversão deverão conter o nome da moeda. Portanto, ao invés de 'USD' ou 'EUR', deve conter "Dólar Comercial" e "Euro", respectivamente

//     * Por padrão, o campo 'Moeda de conversão' exibirá 'Real'

//     * Atenção também às casas decimais dos campos. Como são valores contábeis, eles devem apresentar duas casas após a vírgula. Arredonde sua resposta somente na hora de renderizar o resultado, e para os cálculos utilize sempre os valores vindos da API (utilize o campo `ask` que vem da API).

//     * Utilize sempre o formato `0.00` (número - ponto - duas casas decimais)
