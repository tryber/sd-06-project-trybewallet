import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div className="header_container">
          <div>
            <p data-testid="email-field">
              Email:
              {' '}
              {email}
            </p>
          </div>
          <div>
            <p data-testid="total-field">
              Despesa Total: 0
            </p>
          </div>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
