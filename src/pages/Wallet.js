import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        Carteira
        <header>
          <span data-testid="email-field">
            {email}
          </span>
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);

// export default Wallet;

// class Wallet extends React.Component {
//   render() {
//     const { nomeQueEuQuiser } = this.props;
//     return <div>{ nomeQueEuQuiser }</div>;
//   }
// }

// const mapStateToProps = (state) => ({
//   nomeQueEuQuiser: state.wallet.helloWorld,
// });

// export default connect(
//   mapStateToProps,
// )(Wallet);
