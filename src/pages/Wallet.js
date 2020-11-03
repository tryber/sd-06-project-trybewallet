import React from 'react';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../actions';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mountForm = this.mountForm.bind(this);

    this.state = {
      currencies: [],
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  mountForm(total) {
    const { addData, expenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    const id = expenses.length;
    const output = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    addData(output, total);
  }

  async handleSubmit() {
    const { fetch, rates, total } = this.props;
    const { currency, value } = this.state;
    await fetch();
    let bid = 0;
    // Learned how to iterate through objects here:
    // https://masteringjs.io/tutorials/fundamentals/foreach-object
    Object.keys(rates).forEach((item) => {
      if (currency === item) {
        bid = rates[item].ask;
      }
    });
    // Two decimals round:
    // https://learnersbucket.com/examples/javascript/
    // learn-how-to-round-to-2-decimal-places-in-javascript/
    this.setState({ exchangeRates: rates });
    const newTotal = total + (value * bid);
    this.mountForm(newTotal);
  }

  async componentDidMount() {
    const { fetch } = this.props;
    await fetch();
  }

  render() {
    const { email, rates, total } = this.props;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <header>
          <h3 data-testid='email-field'>{email}</h3>
          <p data-testid='total-field' value='0'>{total}</p>
          <p data-testid='header-currency-field'>BRL</p>
        </header>
        <form>
          <label htmlFor='value'>
            Despesa
            <input
              type='number'
              id='value'
              data-testid='value-input'
              name='value'
              onChange={this.handleChange}
              defaultValue='0'
            />
          </label>
          <label htmlFor='description'>
            <input
              type='text'
              id='description'
              data-testid='description-input'
              name='description'
              onChange={this.handleChange}
            />
          </label>
          <select
            data-testid='currency-input'
            name='currency'
            onChange={this.handleChange}
          >
            {Object.keys(rates)
            .filter((item) => item !== 'USDT')
            .map((item) => {
              return <option key={item} data-testid={item}>{item}</option>
            })}
          </select>
          <select
            data-testid='method-input'
            name='method'
            onChange={this.handleChange}
          >
            {methods.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select
            data-testid='tag-input'
            name='tag'
            onChange={this.handleChange}
          >
            {tags.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button
            type='button'
            onClick={() => this.handleSubmit()}
          >
            Adicionar despesa
          </button>
        </form>
        <WalletTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  rates: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchCurrencies()),
  addData: (expense, total) => dispatch(addExpense(expense, total)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
