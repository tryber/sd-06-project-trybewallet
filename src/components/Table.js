import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { importedExpenses } = this.props;
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
          {importedExpenses.expenses.map((expense) => (
            <tr key={ expense.description }>
              {/* {console.log(expense)} */}
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>
                {
                  Object.values(expense.exchangeRates)
                    .find((actualCurrency) => actualCurrency.code === expense.currency)
                    .name
                }
              </td>
              <td>
                {
                  Number(Object.values(expense.exchangeRates)
                    .find((actualCurrency) => actualCurrency.code === expense.currency)
                    .ask).toFixed(2)
                }
              </td>
              <td>
                {
                  (Number(expense.value) * Number(Object.values(expense.exchangeRates)
                    .find((actualCurrency) => actualCurrency.code === expense.currency)
                    .ask)).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  importedExpenses: state.wallet,
});

Table.propTypes = {
  importedExpenses: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Table);
