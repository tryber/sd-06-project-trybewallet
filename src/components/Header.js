import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logo from '../pages/images/logo-trybe.png';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    const INITIAL_VALUE = (zeroTotal = 0) => zeroTotal;
    return (
      <div>
        <header className="header-wallet">
          <img src={ Logo } alt="logomarca trybe" height="30px" />
          <div className="info-box">
            <p>
              <strong>Email: </strong>
              <span data-testid="email-field">{ email }</span>
            </p>
            <p className="expense-box">
              <strong>Despesa total: </strong>
              <span data-testid="total-field">{ INITIAL_VALUE(total) }</span>
              <span data-testid="header-currency-field">BRL</span>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  value: state.wallet.expenses.value,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
