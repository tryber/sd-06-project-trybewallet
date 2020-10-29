import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = ({ email }) => (
  <header>
    <img src="http://phellipecode.me/landingpage/images/logo.png" alt="logotipo" />
    <div>
      <h3 data-testid="email-field">
        E-mail:
        { email }
      </h3>
      <h3 className="total" data-testid="total-field">
        Despesa Total: R$ 0,00
        <span data-testid="header-currency-field"> BRL </span>
      </h3>
    </div>
  </header>
);

const mapStateToProps = (state) => ({ email: state.user.user.email });

Header.propTypes = {
  email: PropTypes.string,
};

Header.defaultProps = {
  email: 'strange@strange.com',
};

export default connect(mapStateToProps)(Header);
