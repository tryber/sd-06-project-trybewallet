import React, { Component } from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import '../css/header.css';

class Header extends Component {
  constructor() {
    super();
    this.somaTotal = this.somaTotal.bind(this);
  }

  somaTotal() {
    const formatValue = (value) => Math.round(value * 100) / 100;
    const { despesas } = this.props;
    console.log(typeof (despesas));
    if (despesas.length > 0) {
      const aux = despesas.reduce((valor, proximoValor) => {
        const cotacao = proximoValor.exchangeRates[proximoValor.currency].ask;
        return valor + (cotacao * proximoValor.value);
      }, 0);
      return formatValue(aux);
    }
    return 0;
  }

  render() {
    const { emailDoUsuario } = this.props;
    const moedaAtual = 'BRL';
    const total = this.somaTotal();
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
          <p className="valor_total" data-testid="total-field">{total}</p>
          <p className="cambio" data-testid="header-currency-field">{ moedaAtual }</p>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  emailDoUsuario: state.user.email,
  despesas: state.wallet.expenses,
});

Header.propTypes = {
  emailDoUsuario: propType.string.isRequired,
  despesas: propType.arrayOf(propType.any).isRequired,
};

export default connect(mapStateToProps)(Header);
