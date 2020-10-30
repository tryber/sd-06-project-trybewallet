import React from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { fetchSavedCurrencies, saveExpensesAction, saveExpenses } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      expenses: 0,
      description: '',
      currency: '',
      paymentMethod: '',
      tag: '',
    };
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  handleClickSubmit() {
    const { dispatchSaveExpenses, dispatch2 } = this.props;
    const { expenses, description, currency, paymentMethod, tag, total } = this.state;

    const expense = { expenses, description, currency, paymentMethod, tag };
    //Metodo passado no mapDispatchToProps
    dispatch2(this.state);
    this.setState({
      expenses: 0,
      description: '',
      currency: '',
      paymentMethod: '',
      tag: '',
    });
  }

  handleInput(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  }

  handleSelect(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  }

  render() {
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { email, currencies } = this.props;
    const { expenses, description,total } = this.state;
    console.log(this.props.expenses.currency);
    return (
      <div className="containerWallet">
        <header className="containerHeader">
          Email:
          <div data-testid="email-field">{ email }</div>
          Despesa total:
          <div data-testid="total-field">
            { total }
            <div data-testid="header-currency-field">
              BRL
            </div>
          </div>
        </header>
        <main className="containerMain">
          <input
            type="number"
            data-testid="value-input"
            required
            placeholder="Type the value of the expense"
            value={ expenses }
            id="expenses"
            onChange={ this.handleInput }
          />
          <input
            type="text"
            data-testid="description-input"
            required
            placeholder="Type the description of the expense"
            value={ description }
            id="description"
            onChange={ this.handleInput }
          />
          <select
            data-testid="currency-input"
            required
            placeholder="Currency"
            id="currency"
            onChange={ this.handleSelect }
          >
            <option>Select a currency </option>
            {currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
                data-testid={ currency }
              >
                {currency !== 'USDT' ? currency : null}
              </option>
            ))}
          </select>
          <select
            data-testid="method-input"
            required
            placeholder="Payment type"
            id="paymentMethod"
            onChange={ this.handleSelect }
          >
            <option>Select a payment type</option>
            {paymentMethods.map((method) => (
              <option
                key={ method }
                value={ method }
                data-testid={ method }
              >
                { method }
              </option>
            ))}
          </select>
          <select
            data-testid="tag-input"
            required
            placeholder="Category"
            id="tag"
            onChange={ this.handleSelect }
          >
            <option>Select a tag</option>
            {tags.map((tag) => (
              <option
                key={ tag }
                value={ tag }
                data-testid={ tag }
              >
                { tag }
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={ this.handleClickSubmit }
          >
            Adicionar despesa
          </button>
        </main>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchSavedCurrencies()),
  // dispatchSaveExpenses: (data) => dispatch(saveExpensesAction(data)),
  dispatch2: (e) => dispatch(saveExpenses(e)),
});

Wallet.propTypes = {
  email: propType.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
