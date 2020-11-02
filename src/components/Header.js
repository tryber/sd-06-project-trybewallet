import React from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  render() {
    const { email, totalExpenses } = this.props;
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
            {totalExpenses}
            {' '}
            <span data-testid="header-currency-field">
              BRL
            </span>
          </span>
        </div>
      </header>);
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);
