import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesDel } from '../../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.tBody = this.tBody.bind(this);
    this.delRow = this.delRow.bind(this);
  }

  tBody(expense, index) {
    const { currency, description, tag, method, value, exchangeRates, id } = expense;
    const currencyData = Object.values(exchangeRates)
      .find((coin) => coin.code === currency);
    return (
      <tr
        key={ `${currency}${id}${index}` }
        id={ id }
      >
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currency }</td>
        <td>
          { Math.round(100 * currencyData.ask) / 100 }
        </td>
        <td>
          { Math.round(100 * currencyData.ask * expense.value) / 100 }
        </td>
        <td>
          { currencyData.name }
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            onClick={ () => this.delRow(id) }
            type="button"
          >
            Delete
          </button>
        </td>
      </tr>);
  }

  delRow(id) {
    const { clearExpenses } = this.props;
    clearExpenses(id);
  }

  render() {
    const { expenses } = this.props;

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
            {
              expenses
                ? Object.values(expenses)
                  .map((expense, index) => (this.tBody(expense, index)))
                : undefined
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  clearExpenses: (id) => dispatch(expensesDel(id)),
});

Table.propTypes = {
  expenses: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    exchangeRates: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  clearExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
