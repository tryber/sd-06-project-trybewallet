import React, { Component } from 'react';
import propType from 'prop-types';
import '../css/header.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    const moedaAtual = 'BRL';
    return (
      <div className="walletHeader">
        <div className="user">
          <p className="text-name">Usuário</p>
          <p className="email" date-testid="email-field">{ email }</p>
        </div>
        <div className="title">
          <h1 className="text-title">Controle de Despesas.</h1>
        </div>
        <div className="info">
          <p className="cambio" tada-testid="header-currency-field">{ moedaAtual }</p>
          <p className="valor_total" data-testid="total-field">{ total }</p>
        </div>
      </div>

    );
  }
}

Header.propTypes = {
  email: propType.string.isRequired,
  total: propType.number.isRequired,
};

export default Header;
