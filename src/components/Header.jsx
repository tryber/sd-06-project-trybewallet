import React, { Component } from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import '../css/header.css';

class Header extends Component {
  constructor() {
    super();
    this.despesas = this.despesas.bind(this);
  }

  despesas() {
    const { totalDasDespesas } = this.props;
    if (totalDasDespesas.length > 0) {
      const total = totalDasDespesas.reduce((acc, element) => {
        const { ask } = element.exchangeRates[element.currency];
        return acc + (ask * element.value);
      }, 0);
      return total.toFixed(2);
    }
    return 0;
  }

  render() {
    const { emailDoUsuario } = this.props;
    const total = this.despesas();
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
          <p className="valor_total" data-testid="total-field">{ total }</p>
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
