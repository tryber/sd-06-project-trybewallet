import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Wallet.css';
import logo from '../images/logo.png';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header className="header">
          <img
            src={ logo }
            alt="Logo"
            className="img-logo-wallet"
          />
          <span
            data-testid="email-field"
          >
            {email}
          </span>
          <span
            data-testid="total-field"
          >
            0
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

// mapStateToProps é equivalente a um getState()
// mapDispatchToProps é equivalente a um setState()

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
