import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.tBody = this.tBody.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  tBody(expense, index) {
    const { currency, description, tag, method, value, exchangeRates, id } = expense;
    const CURRENCY_DATA = Object.values(exchangeRates)
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
          { Math.round(100 * CURRENCY_DATA.ask) / 100 }
        </td>
        <td>
          { Math.round(100 * CURRENCY_DATA.ask * expense.value) / 100 }
        </td>
        <td>
          { CURRENCY_DATA.name }
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            onClick={ () => this.deleteRow(id) }
            type="button"
          >
            Delete
          </button>
        </td>
      </tr>);
  }

  deleteRow(key) {
    const { eraseExpense } = this.props;
    eraseExpense(key);
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
            {expenses
              ? Object.values(expenses)
                .map((exp, index) => (this.tBody(exp, index)))
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
  eraseExpense: (id) => dispatch(deleteExpense(id)),
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
  eraseExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
