import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    const { loginEmail } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{ loginEmail }</div>
          <div data-testid="total-field">0</div>
          <div data-testid="header-currency-field">BRL</div>
          <h1>TrybeWallet</h1>
        </header>
        <Form />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ loginEmail: state.user.email });

Wallet.propTypes = {
  loginEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
