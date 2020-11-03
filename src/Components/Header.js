import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ email, total }) => (
  <header>
    <Link to="/"><img src="http://phellipecode.me/landingpage/images/logo.png" alt="logotipo" /></Link>
    <div>
      <h3 data-testid="email-field">
        E-mail:
        { email }
      </h3>
      <h3 className="total">
        Despesa Total: R$
        <span data-testid="total-field">{total}</span>
        <span data-testid="header-currency-field"> BRL </span>
      </h3>
    </div>
  </header>
);

const mapStateToProps = (state) => {
  const total = state.wallet.expenses.map((element) => (
    element.exchangeRates[element.currency].ask * element.value
  )).reduce((acc, el) => acc + el, 0);
  return { email: state.user.email, total: total.toFixed(2) };
};

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
};

Header.defaultProps = {
  email: 'strange@strange.com',
  total: 0,
};

export default connect(mapStateToProps)(Header);
