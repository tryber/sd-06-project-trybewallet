import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail } = this.props;

    return (
      <div>
        <div data-testid="email-field">
          <label>Email: { userEmail }</label>
        </div>
        <div data-testid="total-field">
          <label>Despesa Total: R${0}</label>
          <label data-testid="header-currency-field">BRL</label>
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToPros)(Header);
