import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends Component {
  render() {
    const { expensesInfo } = this.props;
    return (
      <div>
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
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesInfo.map(
              ({ description, tag, method, value, currency, exchangeRates }, index) => (
                <tr key={ index }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{(parseFloat(exchangeRates[currency].ask)).toFixed(2)}</td>
                  <td>{(parseFloat(value * exchangeRates[currency].ask)).toFixed(2)}</td>
                  <td>Real</td>
                </tr>
              ),
            )}
          </tbody>

        </table>
      </div>
    );
  }
}
// export default ExpenseTable;
const mapStateToProps = (state) => ({
  expensesInfo: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expensesInfo: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(ExpenseTable);

//   * A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave ***expenses*** que vem do reducer `wallet`.

//     * O campo de Moeda e Moeda de Conversão deverão conter o nome da moeda. Portanto, ao invés de 'USD' ou 'EUR', deve conter "Dólar Comercial" e "Euro", respectivamente

//     * Por padrão, o campo 'Moeda de conversão' exibirá 'Real'

//     * Atenção também às casas decimais dos campos. Como são valores contábeis, eles devem apresentar duas casas após a vírgula. Arredonde sua resposta somente na hora de renderizar o resultado, e para os cálculos utilize sempre os valores vindos da API (utilize o campo `ask` que vem da API).

//     * Utilize sempre o formato `0.00` (número - ponto - duas casas decimais)
