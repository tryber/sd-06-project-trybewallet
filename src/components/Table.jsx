import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expensesState: { expenses } } = this.props;
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
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => (
            <tr key={ element.description }>
              <td>{element.description}</td>
              <td>{element.tag}</td>
              <td>{element.method}</td>
              <td>{element.value}</td>
              <td>
                {
                  Object.values(element.exchangeRates)
                    .find((titleCurrency) => titleCurrency.code === element.currency)
                    .name
                }
              </td>
              <td>
                {
                  parseFloat(Object.values(element.exchangeRates)
                    .find((titleCurrency) => titleCurrency.code === element.currency)
                    .ask).toFixed(2)
                }
              </td>
              <td>
                {
                  parseFloat((element.value) * (Object.values(element.exchangeRates))
                    .find((titleCurrency) => titleCurrency.code === element.currency)
                    .ask).toFixed(2)
                }
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet,
});

Table.propTypes = {
  expensesState: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Table);
