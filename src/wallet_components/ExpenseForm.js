import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dispatchExpense, fetchCurrencyList } from '../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleCurrencyOptionCreation = this.handleCurrencyOptionCreation.bind(this);
  }

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleAddExpense() {
    const { expense } = this.props;
    const expenseToAdd = {
      ...this.state,
    };
    expense(expenseToAdd);
    this.setState((prevState) => ({
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: prevState.id + 1,
    }));
  }

  handleCurrencyOptionCreation() {
    const { isFetching, currencyList } = this.props;
    if (!isFetching && currencyList.length !== 0) {
      const currencyArray = Object.keys(currencyList[0])
        .map((currency) => currencyList[0][`${currency}`]);
      return (
        currencyArray.map(({ code }, index) => (
          <option
            key={ `${index}-${code}` }
            data-testid={ `${code}` }
            value={ `${code}` }
          >
            { `${code}` }
          </option>
        ))
      );
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { isFetching } = this.props;
    if (isFetching) {
      return <h1>LOADING INFORMATION...</h1>;
    }
    return (
      <form className="expense-form-body">
        <label htmlFor="value">
          Valor:
          <input
            name="value"
            id="value"
            type="number"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            id="description"
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda :
          <select
            name="currency"
            type="select"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { this.handleCurrencyOptionCreation() }
          </select>
        </label>
        <label htmlFor="method">
          Metodo de pagamento :
          <select
            name="method"
            id="method"
            type="select"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria :
          <select
            name="tag"
            id="tag"
            type="select"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          className="expense-button"
          type="button"
          onClick={ () => this.handleAddExpense() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencyList: PropTypes.arrayOf(PropTypes.shape()),
  isFetching: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  isFetching: state.wallet.fetchingList,
});

const mapDispatchToProps = (dispatch) => ({
  expense: (object) => dispatch(dispatchExpense(object)),
  currencies: () => dispatch(fetchCurrencyList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
