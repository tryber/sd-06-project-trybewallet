import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Logo from './images/logo-trybe.png';

class Wallet extends React.Component {
  render() {
    const INITIAL_VALUE = 0;
    const { email } = this.props;

    return (
      <div>
        <header>
          <img src={ Logo } alt="logomarca trybe" width="100px" />
          <p>
            Email:
            <span data-testid="email-field">{ email }</span>
          </p>
          <p>
            despesa total:
            <span data-testid="total-field">{ INITIAL_VALUE }</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
