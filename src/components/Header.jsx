import React, { Component } from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import '../css/header.css';

class Header extends Component {
  render() {
    const { emailDoUsuario, totalDasDespesas } = this.props;
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
          <p className="valor_total" data-testid="total-field">{ totalDasDespesas }</p>
          <p className="cambio" data-testid="header-currency-field">{ moedaAtual }</p>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  emailDoUsuario: state.user.email,
  totalDasDespesas: state.wallet.currencies,
});

Header.propTypes = {
  emailDoUsuario: propType.string.isRequired,
  totalDasDespesas: propType.number.isRequired,
};

export default connect(mapStateToProps)(Header);
