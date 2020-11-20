import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../components/Table';
// import { saveExpenses, fetchCoinDataThunk, getCurrencyAPI } from '../actions';
import { fetchCoinData, newExpenses } from '../actions';

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
        // endValue: value * exchangeRates[elem.currency],
      },
      // totalField: 0,// lint
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    currencyFetch();
    // getCurrencyAPI();
  }

  handleChange({ target }) {
    const { value } = target;
    const { name } = target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        // [name]: name === 'value' ? (1 * value) : value,
        [name]: value,
      },
    });
  }

  // editExpense() {
  //   const { expense } = this.state;
  //   if (expense.value && expense.description && expense.tag !== 0) {
  //     this.setState({
  //       expense: {
  //         value: '',
  //         description: '',
  //         currency: '',
  //         method: '',
  //         tag: '',
  //         // endValue: value * exchangeRates[elem.currency],
  //       },
  //     }
    
  async handleClick(e) {
    e.preventDefault();
    const { expense } = this.state;
    const { newExpencesWallet } = this.props;
    if (expense.value && expense.description && expense.tag !== 0) {
    // if (expense.value || expense.description || expense.tag !== 0) {
      await newExpencesWallet(expense);
      this.setState({
        expense: {
          value: '',
          description: '',
          currency: 'USD',
          method: '',
          tag: '',
          // endValue: value * exchangeRates[elem.currency],
        },
      });
    }
  }

  render() {
    // const { value, description, currency, method, tag } = this.state;
    const { expense } = this.state;
    const { value, description, currency, method, tag } = expense;
    const { email, currencies, totalField } = this.props;
    // const { email, currencies, totalField, isEditing } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field" Value="0">{totalField}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <h1>TrybeWallet</h1>
        <form>

          <input
            type="text"
            name="description"
            onChange={ this.handleChange }
            data-testid="description-input"
            placeholder="Descrição="
            value={ description }
          />

          <input
            type="number"
            name="value"
            onChange={ this.handleChange }
            data-testid="value-input"
            placeholder="Valor="
            value={ value }
          />

          <span>
            moeda
          </span>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            {currencies.map((moeda) => (
              <option
                data-testid={ moeda }
                value={ moeda }
                key={ moeda }
              >
                { moeda }
              </option>
            ))}
          </select>

          <span>
            método de pagamento
          </span>
          <select
            id="method"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {/* <option value="Initial">Escolha</option> */}
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <span>
            tag
          </span>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {/* <option value="Initial">Escolha</option> */}
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Trasporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
          {/* <button type="button" onClick={ this.handleClick }>Editar despesa</button> */}
        </form>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.number.isRequired,
  map: PropTypes.func.isRequired,
  currencyFetch: PropTypes.func.isRequired,
  // newAction: PropTypes.func.isRequired,
  newExpencesWallet: PropTypes.func.isRequired,
  totalField: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  totalField: state.wallet.totalField,

});
const mapDispatchToProps = (dispatch) => ({
  // currencyFetch: () => dispatch(fetchCoinDataThunk()),

  newExpencesWallet: (expense) => dispatch(newExpenses(expense)),
  currencyFetch: () => dispatch(fetchCoinData()),
  // getcurrencies: () => dispatch(getCurrencyAPI());
  // newAction: (expense) => dispatch(saveExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// totalField
// handleclick
