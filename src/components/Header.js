import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wallet from '../img/wallet.jpg';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    const cash = 0;
    console.log(this.props);
    return (
      <header className="header-content">
        <div>
          <h1 className="header-title">
            <img src={ Wallet } alt="Wallet" width="80" />
            Trybe Wallet
          </h1>
          <h3 data-testid="email-field">
            Email:
            { email }
          </h3>
          <h3 data-testid="total-field">
            Despesas totais:
            { cash }
          </h3>
          <h3 data-testid="header-currency-field">
            BRL
          </h3>
        </div>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(
  mapStateToProps,
)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
