import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../images/logo.png';
import '../css/Wallet.css';

// Esse é o arquivo de header em que estão presentes o email vindo do estado global,
// o valor total calculado na função abaixo, e a moeda de referência.

class HeaderWallet extends React.Component {
  constructor() {
    super();

    this.calculateTotal = this.calculateTotal.bind(this);
  }

  // Função que calcula o valor total de cada linha.
  calculateTotal() {
    const { expenses } = this.props;
    // modelo de reduce encontrado no seguinte PR: https://github.com/tryber/sd-06-project-trybewallet/blob/marioduartedev/src/pages/Wallet.js
    const total = expenses
      .reduce((accumulator, current) => accumulator + parseFloat((current
        .exchangeRates[current.currency].ask * current.value)), 0);

    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <header className="header-wallet">
        <img
          src={ logo }
          alt="Logo"
          className="img-logo-wallet"
        />
        <span
          data-testid="email-field"
        >
          {email}
        </span>
        <span
          data-testid="total-field"
        >
          {this.calculateTotal()}
        </span>
        <span
          data-testid="header-currency-field"
        >
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(HeaderWallet);

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};
