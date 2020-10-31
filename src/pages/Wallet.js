import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { thunkCurrencyAPI } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      currency: undefined,
    };

    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  async handleFetch() {
    const { fetchCurrency, email } = this.props;
    const result = await fetchCurrency();
    this.setState({
      email: email,
      currencies: result,
    });
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <header>

          <h2 data-testid="email-field">{email}</h2>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <fieldset>
            <label htmlFor="valor">
              Valor:
              <input name="valor" data-testid="value-input" />
            </label>
            <label htmlFor="descrição">
              Descrição
              <input name="descrição" data-testid="description-input" />
            </label>
            <label htmlFor="options">
              Moedas
              <select name="options" data-testid="currency-input">
                {currencies !== undefined ? currencies.map((currency) => (
                  <option key={ currency }>{currency}</option>
                )) : <p>não rolou</p>}
              </select>
            </label>
            <label htmlFor="pagamento">
              Pagamento
              <select name="pagamento" data-testid="method-input">
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="categoria">
              Categoria
              <select name="categoria" data-testid="tag-input">
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
          </fieldset>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(thunkCurrencyAPI()),
});

Wallet.propTypes = {
  currencies: propTypes.object.isRequired,
  email: propTypes.string.isRequired,
  fetchCurrency: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
