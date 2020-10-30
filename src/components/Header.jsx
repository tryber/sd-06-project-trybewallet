import { connect } from 'react-redux';
import React from 'react';

class Header extends React.Component {

  render() {

    const { email } = this.props;

    return(
      <header className="header">
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          Despesa Total: 0,00
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
