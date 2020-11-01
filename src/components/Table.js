import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { excludeItem } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.excludeItem = this.excludeItem.bind(this);
  }

  excludeItem(event) {
    const { importedExpenses, excludingItem } = this.props;
    importedExpenses.expenses.forEach((expense) => {
      if (Number(event.target.name) === expense.id) {
        excludingItem(expense.id);
      }
    });
  }

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
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Math.round((expense.value) * 100)/100}</td>
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
                {' '}
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ this.excludeItem }
                  name={ expense.id }
                >
                  Excluir
                </button>
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

const mapDispatchToProps = (dispatch) => ({
  excludingItem: (id) => dispatch(excludeItem(id)),
});

Table.propTypes = {
  importedExpenses: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
  excludingItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
