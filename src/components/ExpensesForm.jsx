import React from 'react';
import { connect } from 'react-redux';
import { fetchExchangeRates } from '../actions'
import CurrencyOptions from './CurrencyOptions';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleID = this.handleID.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleID() {
    const { id } = this.state;
    const updateId = id + 1;
    this.setState({
      id: updateId,
    });
  }

  // componentDidUpdate(prevProps) {
  //   const { currency } = this.props;
  //   if (prevProps.currency.length !== currency.length) {
  //     this.setState({
  //       teste: currency,
  //     })
  //   }
  // } -----> Desta forma é possível jogar as props vindas do redux para o state

  render() {

    const { currencyProp, fetchRates } = this.props;
    const { value, description, currency, method, tag, id } = this.state

    const localExpenseArray = { id, value, description, currency, method, tag };

    return(
      <form className="expenses">
        <fieldset>
          <legend>Adicionar desespesas:</legend>
          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              onChange={ this.handleChange }
              name="value"
              type="number"
              data-testid="value-input"
              value={value}
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              onChange={ this.handleChange }
              name="description"
              type="text"
              data-testid="description-input"
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
            { currencyProp.map((coin, index) => <CurrencyOptions key={ index } eachCoin={ coin } />)}
            </select>
          </label>

          <label htmlFor="method-input">
            Pagamento:
            <select
              name="method"
              id="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option key="dinheiro">Dinheiro</option>
              <option key="credito">Cartão de crédito</option>
              <option key="debito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Tag:
            <select
              id="tag-input"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            onClick={ () => fetchRates(localExpenseArray, this.handleID) }
            type="button"
          >
            Adicionar despesa
          </button>

        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyProp: state.wallet.currencies.filter((coin) => coin !== 'USDT')
});

const mapDispatchToProps = (dispatch) => ({
  fetchRates: (expenseArray, callback) => dispatch(fetchExchangeRates(expenseArray, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
