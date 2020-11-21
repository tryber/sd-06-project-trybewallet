import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinData, newExpense, editExpense, replaceExpense } from '../actions';
import Table from './Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: 'USD',
        method: '',
        tag: '',
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickExpense = this.handleClickExpense.bind(this);
    this.setDataInForms = this.setDataInForms.bind(this);
    this.resetExpensesDataInForms = this.resetExpensesDataInForms.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    currencyFetch();
  }

  componentDidUpdate(prevProps) {
    this.setEditDataInForms(prevProps);
  }

  setEditDataInForms(prevProps) {
    const { isEditing, stateExpense } = this.props;
    if (prevProps.isEditing !== isEditing) {
      if (isEditing) {
        this.setState({ expense: stateExpense });
      } else { 
        this.resetExpensesDataInForms();
      }
    }
  }

  handleChange({ target }) {
    const { value } = target;
    const { name } = target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  handleClickExpense() {
    const { dispatchReplaceExpense, expense } = this.props;
    console.log('handleClickExpense', expense)
    dispatchReplaceExpense(expense);
  }

  resetExpensesDataInForms() {
    this.setState({
      expense: {
        value: '',
        description: '',
        currency: 'USD',
        method: '',
        tag: '',
      }
    });
  }

  async handleClick(e) {
    e.preventDefault();
    const { expense } = this.state;
    const { dispatchNewExpense, isEditing } = this.props;
    if (isEditing) {
      this.handleClickExpense();
    } else if (expense.value && expense.description && expense.tag !== 0) {
      await dispatchNewExpense(expense);
      this.resetExpensesDataInFroms();
      };
    }

  render() {
    const { expense } = this.state;
    const { value, description, currency, method, tag } = expense;
    const { email, currencies, totalField, isEditing } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ totalField || '0' }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <hr />
        <form>
          <label htmlFor="email">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <span>
            Moeda:
          </span>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((moeda) => (
              <option
                data-testid={ moeda }
                value={ moeda }
                key={ moeda }
              >
                { moeda}
              </option>
            ))}
          </select>
          <span>
            Método de pagamento:
          </span>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <span>
            Tag:
          </span>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="initial">Escolha</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button type="button" onClick={ this.handleClick }>{ isEditing ? 'Editar despesa' : 'Adicionar despesa' }</button>
        </form>
        <Table editExpense={ this.handleClickExpense } />
      </div>
    );
  }

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.number.isRequired,
  currencyFetch: PropTypes.func.isRequired,
  dispatchNewExpense: PropTypes.func.isRequired,
  totalField: PropTypes.number.isRequired,
  isEditing: PropTypes.bool,
  dispatchReplaceExpense: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  isEditing: false,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  totalField: state.wallet.totalField,
  isEditing: state.wallet.isEditing,
  stateExpenses: state.wallet.expense,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchReplaceExpense: (expense) => dispatch(replaceExpense(expense)),
  dispatchNewExpense: (expense) => dispatch(newExpense(expense)),
  currencyFetch: () => dispatch(fetchCoinData()),

});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
