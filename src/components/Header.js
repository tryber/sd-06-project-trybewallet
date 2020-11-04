import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeLogo from '../images/trybe_logo.png';
import '../style/Header.css';

class Header extends Component {
  render() {
    const { emailLogin, totalExpense } = this.props;
    return (
      <header className="header">
        <img className="image_header" src={ trybeLogo } alt="Logo Trybe" />
        <span>Email:</span>
        <span data-testid="email-field">{ emailLogin }</span>
        <div>
          <span className="span_header_right">Despesa Total: R$</span>
          <span className="span_header_right" data-testid="total-field">
            { totalExpense.reduce(((acc, curr) => acc + parseFloat((curr
              .exchangeRates[curr.currency].ask * curr.value).toFixed(2))), 0) }
            {/* reduce()executa uma função reducer (fornecida por você) para cada elemento do array, resultando num único valor de retorno.
            parseFloat() analisa um argumento string e retorna um número de ponto flutuante.
            toFixed() formata um número utilizando notação de ponto fixo.
            */}
          </span>
          <span className="span_header_left" data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailLogin: state.user.email,
  totalExpense: state.wallet.expenses,
});

Header.propTypes = {
  emailLogin: PropTypes.string.isRequired,
  totalExpense: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(Header);
