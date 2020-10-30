import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import '../css/Wallet.css';
import trybeLogo from '../imgs/trybe-logo.png';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    const { user: email } = this.props;

    this.state = {
      email,
    };
  }

  render() {
    const { email } = this.state;
    return (
      <div>
        <header className="header">
          <img src={ trybeLogo } alt="Trybe logo" className="trybe-logo" />
          <div>
            Câmbio:
            <span data-testid="header-currency-field">
              {' BRL' }
            </span>
          </div>
          <div>
            Total:
            <span data-testid="total-field">
              { ' 0' }
            </span>
          </div>
          <h2 data-testid="email-field">{ email }</h2>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
