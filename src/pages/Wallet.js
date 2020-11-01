import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpense, fetchData } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  render() {
    const { total } = this.state;
    const { user } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ user }</span>
          <input
            type="text"
            value={ total }
            data-testid="total-field"
          />
          <select data-testid="header-currency-field">
            <option value="BRL">BRL</option>
          </select>
        </header>
        <form>
          <input
            type="text"
            data-testid="value-input"
          />
          <input
            type="text"
            data-testid="description-input"
          />
          <select data-testid="currency-input">
            <option data-testid="USD" value="USD">USD</option>
            <option data-testid="CAD" value="CAD">CAD</option>
            <option data-testid="EUR" value="EUR">EUR</option>
            <option data-testid="GBP" value="GBP">GBP</option>
            <option data-testid="ARS" value="ARS">ARS</option>
            <option data-testid="BTC" value="BTC">BTC</option>
            <option data-testid="LTC" value="LTC">LTC</option>
            <option data-testid="JPY" value="JPY">JPY</option>
            <option data-testid="CHF" value="CHF">CHF</option>
            <option data-testid="AUD" value="AUD">AUD</option>
            <option data-testid="CNY" value="CNY">CNY</option>
            <option data-testid="ILS" value="ILS">ILS</option>
            <option data-testid="ETH" value="ETH">ETH</option>
            <option data-testid="XRP" value="XRP">XRP</option>
          </select>
          <select data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
          <button type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  loading: state.wallet.loading,
  expenses: state.wallet.expenses,
  data: state.wallet.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData),
  saveExpense: (expenses) => dispatch(saveExpense(expenses)),
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
