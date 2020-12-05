import React, { Component } from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import '../css/header.css';

class Header extends Component {
  render() {
    const { emailDoUsuario, totalDasDespesas } = this.props;
    let resultado = 0;
    if (totalDasDespesas.lenght > 0) {
      resultado = totalDasDespesas.reduce((acc, currentValue) => {
        const { currency, exchangeRates, value } = currentValue;

        const exchangeRateToBRL = exchangeRates[currency].ask;
        const valueInBRL = value * exchangeRateToBRL;
        return acc + valueInBRL;
      }, 0);
    }
    resultado = (Math.round(resultado * 100)) / 100;
    console.log(resultado);
    const moedaAtual = 'BRL';

    return (
      <div className="walletHeader">
        <div className="user">
          <p className="text-name">Usuário</p>
          <p className="email" data-testid="email-field">{ emailDoUsuario }</p>
        </div>
        <div className="title">
          <h1 className="text-title">Controle de Despesas.</h1>
        </div>
        <div className="info">
          <p className="valor_total" data-testid="total-field">{ resultado }</p>
          <p className="cambio" data-testid="header-currency-field">{ moedaAtual }</p>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  emailDoUsuario: state.user.email,
  totalDasDespesas: state.wallet.expenses,
});

Header.propTypes = {
  emailDoUsuario: propType.string.isRequired,
  totalDasDespesas: propType.arrayOf(propType.object).isRequired,
};

export default connect(mapStateToProps)(Header);
