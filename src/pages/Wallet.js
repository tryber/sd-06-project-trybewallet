import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { thunkCurrency } = this.props;
    thunkCurrency();
  }

  render() {
    const { userEmail, currenciesAPI } = this.props;
    return (
      <div>
        <header>
          <div className="header-info">
            <p data-testid="email-field">
              Email:
              {userEmail.email}
            </p>
            <p data-testid="total-field">0</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <form>
          <fieldset>
            <label htmlFor="input-value">
              Valor da despesa:
              <input
                type="number"
                data-testid="value-input"
                id="input-value"
                min="0"
              />
            </label>
            <label htmlFor="input-description">
              Descrição:
              <input
                type="text"
                data-testid="description-input"
                id="input-description"
              />
            </label>
            <label htmlFor="input-currency">
              Moeda:
              <select
                data-testid="currency-input"
                id="input-currency"
              >
                { currenciesAPI.map((currency) => (
                  <option
                    key={ currency }
                    data-testid={ currency }
                    value={ currency }
                  >
                    { currency }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="input-method">
              Método:
              <select
                data-testid="method-input"
                id="input-method"
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="input-tag">
              Categoria:
              <select
                data-testid="tag-input"
                id="input-tag"
              >
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
  userEmail: state.user,
  currenciesAPI: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  thunkCurrency: () => dispatch(thunkCurrencies()),
});

Wallet.propTypes = {
  userEmail: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  currenciesAPI: PropTypes.arrayOf(Object).isRequired,
  thunkCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
