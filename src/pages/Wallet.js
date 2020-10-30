import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return <div>
      <header>
        <h2 data-testid="email-field">{ email }</h2>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    </div>
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
