import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../index.css';  
import trybeLogo from '../img/trybe-logo.png';
import Form from '../components/Form';

function Wallet({ email }) {
  return (
    <div>
      <header>
        <img src={ trybeLogo } alt="Trybe logo" />
        <div>
          <span data-testid="email-field">
            E-mail: {email}
          </span>
          <span data-testid="total-field">Despesa Total: R$ 0,00</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
      <Form />
    </div>
  )
}

Wallet.propTypes = {
  email:  PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
