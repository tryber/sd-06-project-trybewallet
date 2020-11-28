import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense,
  totalHeader,
  addExpense,
  isEditing,
  editingExpense,
  setId,
} from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
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

  handleForms(expenses) {
    const { actionIsEditing, actionSetId } = this.props;
    actionIsEditing(true);
    actionSetId(expenses.id);
    this.setState({
      id: expenses.id, expenses,
    });
    // actionDeleteExpense(expenses);
  }

  handleSubmitEdit() {
    const { actionTotalHeader,
      currencies,
      actionIsEditing,
      actionEditingExpense,
    } = this.props;
    const { id, expenses } = this.state;
    // addExpenses({ ...expenses, id, exchangeRates: { ...currencies } });
    actionEditingExpense({ ...expenses, id, exchangeRates: { ...currencies } });
    actionTotalHeader({ ...expenses, id, exchangeRates: { ...currencies } });
    actionIsEditing(false);
  }

  render() {
    const { storeExpenses, checked } = this.props;
    const { expenses } = this.state;
    const {
      expenses: { value, description, currency, method, tag },
    } = this.state;
    // SEPARANDO VISUALMENTE----------------------------------------------------------------------------------------------------------
    const editForms = (
      <div>
        <form>
          <h2>
            Edite:
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
      <div>
        {renderForms}
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
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(expense) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storeExpenses: state.wallet.expenses,
  storeTotal: state.wallet.total,
  currenciesKeys: Object.keys(state.wallet.currencies),
  currencies: state.wallet.currencies,
  checked: state.wallet.checked,
});

const mapDispatchToProps = (dispatch) => ({
  actionDeleteExpense: (expense) => dispatch(deleteExpense(expense)),
  actionTotalHeader: (state) => dispatch(totalHeader(state)),
  addExpenses: (state) => dispatch(addExpense(state)),
  actionIsEditing: (state) => dispatch(isEditing(state)),
  actionEditingExpense: (state) => dispatch(editingExpense(state)),
  actionSetId: (number) => dispatch(setId(number)),
});

Table.propTypes = {
  storeExpenses: PropTypes.arrayOf(PropTypes.any),
  actionDeleteExpense: PropTypes.func.isRequired,
  actionTotalHeader: PropTypes.func.isRequired,
  currenciesKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  actionIsEditing: PropTypes.func.isRequired,
  checked: PropTypes.objectOf().isRequired,
  actionEditingExpense: PropTypes.func.isRequired,
  actionSetId: PropTypes.func.isRequired,
};

Table.defaultProps = {
  storeExpenses: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
