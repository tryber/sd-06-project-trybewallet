import React from 'react';
import { connect } from 'react-redux';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, totalExpenses = 0 } = this.props;
    return (
      <header>
        <div className="logo-vbwallet logo-small">
          <span className="vb-logo">VB</span>
          <span className="wallet-logo">Wallet</span>
        </div>
        <div>
          <span className="header-info" data-testid="email-field">
            E-mail:
            {' '}
            {email}
          </span>
          <span className="header-info" data-testid="total-field">
            Despesas totais:
            {' '}
            {Math.ceil(totalExpenses * 100) / 100}
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>);
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);
