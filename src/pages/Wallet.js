import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import trybe from '../image/trybeIMG.png';
import '../index.css';
import { walletAPI, addExpenseThunk } from '../actions';
import DebtsTable from '../components/debtsTable';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidMount() {
    const { currencAPI } = this.props;
    currencAPI();
  }

  sumExpenses() {
    const { expenses } = this.props;
    const sumExpenses = expenses
      .reduce((acc, current) => acc + Number((current.exchangeRates[current.currency]
        .ask * current.value)
        .toFixed(2)), 0);
    return sumExpenses;
  }

  handleChange(e, name) {
    e.preventDefault();
    this.setState({
      [name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const expensesKeys = { id, value, description, currency, method, tag };
    const { walletState } = this.props;
    walletState(expensesKeys);
    this.setState((Previous) => ({ id: Previous.id + 1 }));
  }

  render() {
    const { email } = this.props;
    const { currencies } = this.props;
    const coins = Object.keys(currencies);
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header className="wallet-header">
          <img src={ trybe } alt="logo-trybe" className="logo-wallet" />
          <div className="wallet-paragraph">
            <p
              data-testid="email-field"
            >
              Email:
              { email }
            </p>
            <p
              data-testid="total-field"
            >
              Despesa Total: R$
              { this.sumExpenses() }
            </p>
            <p
              data-testid="header-currency-field"
            >
              BRL
            </p>
          </div>
        </header>
        <section>
          <form className="form" onSubmit={ this.handleSubmit }>
            <label
              htmlFor="valor:"
            >
              Valor:
              <input
                type="text"
                className="valor"
                id="valor:"
                data-testid="value-input"
                onChange={ (e) => this.handleChange(e, 'value') }
                value={ value }
              />
            </label>
            <label
              htmlFor="descricao:"
            >
              Descrição:
              <input
                type="text"
                id="descricao:"
                data-testid="description-input"
                onChange={ (e) => this.handleChange(e, 'description') }
                value={ description }
              />
            </label>
            <label
              htmlFor="moeda:"
            >
              Moeda:
              <select
                id="moeda:"
                data-testid="currency-input"
                onChange={ (e) => this.handleChange(e, 'currency') }
                value={ currency }
              >
                {coins.filter((el) => el !== 'USDT')
                  .map((el, idx) => (
                    <option
                      id="moeda"
                      key={ idx }
                      data-testid={ el }
                    >
                      { el }
                    </option>)) }
              </select>
            </label>
            <label
              htmlFor="metodo_pg"
            >
              forma de pagamento:
              <select
                id="metodo_pg"
                data-testid="method-input"
                onChange={ (e) => this.handleChange(e, 'method') }
                value={ method }
              >
                <option id="metodo_pg">Dinheiro</option>
                <option id="metodo_pg">Cartão de crédito</option>
                <option id="metodo_pg">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag">
              tag:
              <select
                id="tag"
                data-testid="tag-input"
                value={ tag }
                onChange={ (e) => this.handleChange(e, 'tag') }
              >
                <option id="tag">Alimentação</option>
                <option id="tag">Lazer</option>
                <option id="tag">Trabalho</option>
                <option id="tag">Transporte</option>
                <option id="tag">Saúde</option>
              </select>
            </label>
            <button type="submit" className="addExpenseBtn">Adicionar despesa</button>
          </form>
        </section>
        <DebtsTable />
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
  currencAPI: () => dispatch(walletAPI()),
  walletState: (expenses) => dispatch(addExpenseThunk(expenses)) });
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  currencAPI: propTypes.func.isRequired,
  currencies: propTypes.objectOf(propTypes.string).isRequired,
  expenses: propTypes.objectOf(propTypes.string).isRequired,
  walletState: propTypes.arrayOf(Object).isRequired,
};
