import React, { Component } from 'react';
import '../css/header.css';


class Header extends Component {

  render() {
    const { email, total } = this.props;
    return(
      <div className="walletHeader">
        <div className="user">
          <h4>Usuário</h4>
          <h4 className="email" date-testid="email-field">{ email } </h4>
        </div>
        <div className="title">
          <h1 className="text-title">Controle de Despesas.</h1>
        </div>
        <div className="info">
          <p className="cambio" tada-testid="header-currency-field">"BRL"</p>
          <p className="valor_total" data-testid="total-field">{ total }</p>
        </div>
      </div>

    );
  };
}

export default Header;
