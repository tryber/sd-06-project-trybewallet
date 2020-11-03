import React from 'react';
import propType from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExchangeRates } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { criateCurrencies } = this.props;
    criateCurrencies();
  }

  handleClick(event) {
    event.preventDefault();
    const { criateExpense } = this.props;

    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };

    this.setState((prevState) => ({ id: prevState.id + 1 }));
    criateExpense(expense);
  }

  handleChange({ target }) {
    const { id, value } = target;

    if (target.tagName === 'INPUT') {
      this.setState({ [id]: value });
    } else {
      const select = document.querySelector(`#${id}`);
      const selectedValue = select.options[select.selectedIndex].value;
      this.setState({ [id]: selectedValue });
    }
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value } = this.state;
    const totalValue = expenses.length ? Math.round(expenses
      .reduce((acc, cur) => acc + cur.value
       * cur.exchangeRates[cur.currency].ask, 0) * 100) / 100 : 0;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{`${totalValue}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor da despesa:
            <input
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              data-testid="description-input"
              id="description"
              onChange={ this.handleChange }
            />
          </label>
          <select
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
                data-testid={ currency }
              >
                {currency !== 'USDT' ? currency : null}
              </option>))}
          </select>
          <select data-testid="method-input" id="method" onChange={ this.handleChange }>
            {methods.map((method) => (
              <option
                key={ method }
                value={ method }
                data-testid={ method }
              >
                { method }
              </option>))}
          </select>
          <select data-testid="tag-input" id="tag" onChange={ this.handleChange }>
            {tags.map((tag) => (
              <option
                key={ tag }
                value={ tag }
                data-testid={ tag }
              >
                { tag }
              </option>))}
          </select>
          <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
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
  criateCurrencies: () => dispatch(fetchCurrencies()),
  criateExpense: (expenses) => dispatch(fetchExchangeRates(expenses)),
});

Wallet.propTypes = {
  email: propType.string.isRequired,
  criateCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  criateExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
