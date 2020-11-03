import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencyValues } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencyValue } = this.props;
    fetchCurrencyValue();
  }

  render() {
    const {
      user: { email },
      wallet: { currencies },
    } = this.props;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <header className="wallet-header">
          <h3 data-testid="email-field">
            { email }
          </h3>
          <h3>
            Despesa total:
            <span data-testid="total-field">
              0
            </span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </h3>
        </header>
        <form className="add-expenses">
          <label htmlFor="value-input-id">
            Valor:
            <input
              data-testid="value-input"
              id="value-input-id"
            />
          </label>
          <label htmlFor="currency-input-id">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input-id"
            >
              {
                currencies.map((currency) => (
                  <option
                    data-testid={ currency }
                    key={ currency }
                  >
                    { currency }
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input-id">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method-input-id"
            >
              {
                methodOptions
                  .map((method) => (
                    <option
                      data-testid={ method }
                      key={ method }
                    >
                      { method }
                    </option>
                  ))
              }
            </select>
          </label>
          <label htmlFor="tag-input-id">
            Tag:
            <select
              data-testid="tag-input"
              id="tag-input-id"
            >
              {
                tagOptions
                  .map((tag) => (
                    <option
                      data-testid={ tag }
                      key={ tag }
                    >
                      { tag }
                    </option>
                  ))
              }
            </select>
          </label>
          <label htmlFor="description-input-id">
            Descrição:
            <input
              data-testid="description-input"
              id="description-input-id"
            />
          </label>
          <button
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  user,
  wallet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyValue: (currencyData) => dispatch(fetchCurrencyValues(currencyData)),
});

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  fetchCurrencyValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
