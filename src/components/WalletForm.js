import React from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { apiCurrencies, apiExpense } from '../actions';
import { paymentOpt, categoryOpt } from '../services/helper';
import Table from './Table';
import '../css/bulma.css';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      sumTotal: 0,
      aux: [],
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowTotal = this.handleShowTotal.bind(this);
  }

  async componentDidMount() {
    const { dispatchGetAll } = this.props;
    dispatchGetAll();
  }

  componentDidUpdate() {
    this.handleShowTotal();
  }

  handleInputs(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleOptions(value, id) {
    this.setState({ [id]: value });
  }

  handleSubmit() {
    const { dispatchExchange } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const state = { value, description, currency, method, tag };
    dispatchExchange(state);
  }

  handleShowTotal() {
    const { aux } = this.state;
    const { expenses } = this.props;
    if (aux !== expenses) {
      this.setState({ aux: expenses });
      const { sumTotal } = this.state;
      if (expenses[0]) {
        const { currency, value, exchangeRates } = expenses[expenses.length - 1];
        const compra = exchangeRates[currency].ask;
        const sum = value * compra;
        return this.setState({ sumTotal: sumTotal + sum });
      }
    }
  }

  render() {
    const { currencies, email } = this.props;
    const { value, sumTotal = 0 } = this.state;
    if (currencies) {
      return (
        <section>
          <header className="hero is-dark">
            <div className="hero-body">
              <div className="container">
                <p
                  data-testid="email-field"
                  className="subtitle"
                >
                  {`Bem vindo : ${email}`}
                </p>
                <p data-testid="total-field">{`Total = ${sumTotal}`}</p>
                <p data-testid="header-currency-field" value="BRL">Moeda Local: BRL</p>
                <form className="field-body">
                  <input
                    className="input is-grouped is-small"
                    data-testid="value-input"
                    type="number"
                    placeholder="Valor da despesa"
                    id="value"
                    onChange={ this.handleInputs }
                    value={ value }
                  />
                  <input
                    className="input is-grouped is-small"
                    type="text"
                    data-testid="description-input"
                    placeholder="Descrição da despesa"
                    id="description"
                    onChange={ this.handleInputs }
                  />
                  <select
                    className="select is-grouped is-small"
                    data-testid="currency-input"
                    id="currency"
                    onChange={ (e) => this.handleOptions(e.target.value, e.target.id) }
                  >
                    <option disabled selected>moeda</option>
                    {currencies.map((item) => (
                      <option key={ item } data-testid={ item } value={ item }>
                        { item }
                      </option>
                    ))}
                  </select>
                  <select
                    className="select is-grouped is-small"
                    data-testid="method-input"
                    id="method"
                    onChange={ (e) => this.handleOptions(e.target.value, e.target.id) }
                  >
                    <option disabled selected>método de pagamento</option>
                    {paymentOpt.map((item) => (
                      <option key={ item } data-testid={ item } value={ item }>
                        { item }
                      </option>
                    ))}
                  </select>
                  <select
                    className="select is-grouped is-small"
                    data-testid="tag-input"
                    id="tag"
                    onChange={ (e) => this.handleOptions(e.target.value, e.target.id) }
                  >
                    <option disabled selected>categoria</option>
                    {categoryOpt.map((item) => (
                      <option key={ item } data-testid={ item } value={ item }>
                        { item }
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="input is-grouped is-small"
                    onClick={ () => this.handleSubmit() }
                  >
                    Adicionar despesa
                  </button>
                </form>
              </div>
            </div>
          </header>
          <Table />
        </section>
      );
    }
    if (!currencies) {
      return <div>Oi</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetAll: () => dispatch(apiCurrencies()),
  dispatchExchange: (expensesForm) => dispatch(apiExpense(expensesForm)),
});

WalletForm.propTypes = {
  email: propType.string,
  dispatchExchange: propType.func.isRequired,
  dispatchGetAll: propType.func.isRequired,
  currencies: propType.arrayOf(propType.string).isRequired,
  expenses: propType.arrayOf(propType.object).isRequired,
};

WalletForm.defaultProps = {
  email: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
