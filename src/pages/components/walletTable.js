import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesDel } from '../../actions';

const object = {
  USD: 'Dólar Comercial',
  CAD: 'Dólar Canadense',
  EUR: 'Euro',
  GBP: 'Libra Esterlina',
  ARS: 'Peso Argentino',
  BTC: 'Bitcoin',
  LTC: 'Litecoin',
  JPY: 'Iene Japonês',
  CHF: 'Franco Suíço',
  AUD: 'Dólar Australiano',
  CNY: 'Yuan Chinês',
  ILS: 'Novo Shekel Israelense',
  ETH: 'Ethereum',
  XRP: 'Ripple',

};

class Table extends Component {
  constructor(props) {
    super(props);
    this.tBody = this.tBody.bind(this);
    this.delRow = this.delRow.bind(this);
  }

  editing(type, id) {
    const { editExpense } = this.props;
    editExpense(type, id);
  }

  tBody(expense) {
    const {
      description,
      tag,
      method,
      value,
      exchangeRates,
      id,
      currency,
    } = expense;
    const currencyData = Object.values(exchangeRates)
      .find((coin) => coin.code === currency);
    return (
      <tr
        key={ id }
        id={ id }
      >
        <td className="descTb">{ description }</td>
        <td className="tagTb">{ tag }</td>
        <td className="methodTb">{ method }</td>
        <td className="valueTb">{ value }</td>
        <td className="moedaTb">{ object[currency] }</td>
        <td>
          {/* {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)} */}
          { (Math.round(100 * currencyData.ask) / 100).toFixed(2) }
        </td>
        <td>
          {/* {parseFloat(expense.exchangeRates[expense.currency].ask * expense.value) */}
          {/* .toFixed(2)} */}
          { (Math.round(100 * currencyData.ask * value) / 100).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => {
              this.editing('edit', id);
            } }
          >
            Editar
          </button>
          {/* <Form nameBtn="Editar despesa" /> */}
          <button
            data-testid="delete-btn"
            onClick={ () => this.delRow(expense.id) }
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

        <table className="tabela">
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
                ? expenses
                  .map((expense) => (this.tBody(expense)))
                : 'deu erro'
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
  expenses: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.number,
    value: PropTypes.number,
    currency: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.func,
    total: PropTypes.number,
  })).isRequired,
  clearExpenses: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
