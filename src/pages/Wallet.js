import React from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { fetchCurrencies, registerExpense } from '../actions';
import { paymentMethods, tagOptions } from './walletHelpers';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleInputs = this.handleInputs.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  handleInputs(event) {
    const { value, id } = event.target;
    if (event.target.tagName === 'INPUT') {
      this.setState({ [id]: value });
    } else {
      const { selectedIndex } = event.nativeEvent.target.options;
      const selectedOption = event.nativeEvent.target.options[selectedIndex].innerText;
      this.setState({ [id]: selectedOption });
    }
  }

  handleButtonClick() {
    const { dispatchSaveExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const payload = { value, description, currency, method, tag };
    dispatchSaveExpense(payload);
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { userEmail, currencies } = this.props;
    const { value, description } = this.state;
    return (
      <section className="wallet-page">
        <header>
          <span data-testid="email-field">{ userEmail }</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <main>
          <section className="inputs-container">
            <input
              placeholder="valor da despesa"
              type="number"
              data-testid="value-input"
              onChange={ this.handleInputs }
              id="value"
              value={ value }
            />
            <input
              placeholder="Descrição da despesa"
              type="text"
              data-testid="description-input"
              onChange={ this.handleInputs }
              id="description"
              value={ description }
            />
            <select
              data-testid="currency-input"
              onChange={ this.handleInputs }
              id="currency"
              placeholder="Currency"
            >
              <option disabled selected value> -- select a currency -- </option>
              {currencies.map((currency) => (
                <option
                  key={ currency }
                  value={ currency }
                  data-testid={ currency }
                >
                  {currency !== 'USDT' ? currency : null}
                </option>))}
            </select>
            <select
              data-testid="method-input"
              onChange={ this.handleInputs }
              id="method"
            >
              <option disabled selected value> -- payment method -- </option>
              {paymentMethods.map((method) => (
                <option
                  key={ method }
                  value={ method }
                  data-testid={ method }
                >
                  {method}
                </option>
              ))}
            </select>
            <select
              data-testid="tag-input"
              onChange={ this.handleInputs }
              id="tag"
            >
              <option disabled selected value> -- expense type -- </option>
              {tagOptions.map((tag) => (
                <option
                  key={ tag }
                  value={ tag }
                  data-testid={ tag }
                >
                  {tag}
                </option>
              ))}
            </select>
          </section>
          <button type="button" onClick={ this.handleButtonClick }>
            Adicionar despesa
          </button>
        </main>
        <ExpensesTable />
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  dispatchSaveExpense: (expenseData) => dispatch(registerExpense(expenseData)),
});

Wallet.propTypes = {
  userEmail: propType.string.isRequired,
  dispatchFetchCurrencies: propType.func.isRequired,
  currencies: propType.arrayOf(propType.string).isRequired,
  dispatchSaveExpense: propType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
