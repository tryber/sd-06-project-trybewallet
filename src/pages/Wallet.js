import React from 'react';
import { conect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return(
      <header>
        <h3 data-testid='email-field'>{email}</h3>
        <p data-testid='total-field'>0</p>
        <p data-testid='header-currency-field'>BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default conect(mapStateToProps)(Wallet);
