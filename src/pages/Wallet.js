import React from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { expenses } = this.state;
    return (
      <div className="containerWallet">
        <header className="containerHeader">
          Email:
          <div data-testid="email-field">{ email }</div>
          Despesa total:
          <div data-testid="total-field">
            { expenses }
            <div data-testid="header-currency-field">
              BRL
            </div>
          </div>
        </header>
      </div>
      // <div>{ nome }</div>
    );
  }
}

// eslint-disable-next-line no-multi-assign
const mapStateToProps = (state) => ({
  nome: state.wallet.helloWorld,
  email: state.user.email,
});

Wallet.propTypes = {
  email: propType.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
