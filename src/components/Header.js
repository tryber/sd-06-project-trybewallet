import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <span>Email:</span>
        <span data-testid="email-field">{ email }</span>
        <br />
        <span>Depesa Total: R$</span>
        <span data-testid="total-field">
          {' '}
          { 0 }
          {' '}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
