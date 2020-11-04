import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: 'BRL',
      expenses: 0,
    };
  }

  render() {
    const { emailLogin } = this.props;
    const { currencies, expenses } = this.state;
    return (
      <div>
        <header>
          <div>
            Login:
            <div data-testid="email-field">{ emailLogin }</div>
          </div>
          <div data-testid="total-field">
            Despesas:
            { expenses }
          </div>
          <div data-testid="header-currency-field">
            Despesas:
            { currencies }
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  walletProps: state.wallet.expenses,
  emailLogin: state.user.email,
});

Wallet.propTypes = {
  emailLogin: PropTypes.string,
};

Wallet.defaultProps = {
  emailLogin: 'email',
};

export default connect(mapStateToProps, null)(Wallet);
