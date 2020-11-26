import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, totalHeader, fetchCurrency, addExpense } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      id: 0,
      expenses: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleForms = this.handleForms.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleCurrencies() {
    const { currenciesKeys } = this.props;
    const filteredCurrencies = currenciesKeys.filter((currency) => currency !== 'USDT');

    return (
      filteredCurrencies.map((currency) => (
        <option key={ currency } value={ currency } data-testid={ currency }>
          {currency}
        </option>
      ))
    );
  }

  handleDelete(expense) {
    const { actionDeleteExpense, actionTotalHeader } = this.props;
    actionDeleteExpense(expense);
    actionTotalHeader(expense);
  }

  handleForms(expense) {
    const { actionDeleteExpense } = this.props;
    actionDeleteExpense(expense);
    console.log(expense);
    this.setState({
      checked: true, id: expense.id,
    });
  }

  handleSubmitEdit() {
    const { actionTotalHeader, addExpenses, currencies } = this.props;
    const { id, expenses } = this.state;
    addExpenses({ ...expenses, id, exchangeRates: { ...currencies } });
    actionTotalHeader({ ...expenses, id, exchangeRates: { ...currencies } });
    this.setState({
      checked: false,
    });
  }

  render() {
    const { storeExpenses } = this.props;
    const { checked, expenses } = this.state;
    const {
      expenses: { value, description, currency, method, tag },
    } = this.state;
    // SEPARANDO VISUALMENTE----------------------------------------------------------------------------------------------------------
    const editForms = (
      <div>
        <form>
          <h2>
            Editar despesa:
          </h2>
          <span>
            Valor da Despesa:
          </span>
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            type="number"
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
              value: event.target.value } }) }
          />
          <br />
          <span>
            Descrição da Despesa:
          </span>
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
              description: event.target.value } }) }
          />
          <br />
          <span>
            Moeda de Despesa:
          </span>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
              currency: event.target.value } }) }
          >
            {this.handleCurrencies()}
          </select>
          <br />
          <span>
            Método de Pagamento:
          </span>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
              method: event.target.value } }) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <br />
          <span>
            TAG:
          </span>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
              tag: event.target.value } }) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button
          type="button"
          onClick={ this.handleSubmitEdit }
        >
          Editar despesa
        </button>
      </div>
    );

    const renderForms = checked ? editForms : null;
    // TABELA ANTES DO EDITAR ABAIXO, SEPARANDO VISUALMENTE----------------------------------------------------------------------
    return (
      <table>
        <div>
          {renderForms}
        </div>
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
          { storeExpenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                {
                  parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                }
              </td>
              <td>
                {
                  (parseFloat(expense.exchangeRates[expense.currency].ask)
                  * expense.value).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.handleForms(expense) }
                >
                  Editar despesa
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleDelete(expense) }
                >
                  Deletar despesa
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  storeExpenses: state.wallet.expenses,
  storeTotal: state.wallet.total,
  currenciesKeys: Object.keys(state.wallet.currencies),
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  actionDeleteExpense: (expense) => dispatch(deleteExpense(expense)),
  actionTotalHeader: (state) => dispatch(totalHeader(state)),
  fetchCurrencies: (state) => dispatch(fetchCurrency(state)),
  addExpenses: (state) => dispatch(addExpense(state)),
});

Table.propTypes = {
  storeExpenses: PropTypes.arrayOf(PropTypes.any),
  actionDeleteExpense: PropTypes.objectOf().isRequired,
  actionTotalHeader: PropTypes.objectOf().isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  currenciesKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
};

Table.defaultProps = {
  storeExpenses: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
