import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import index from '../reducers';
// import { walletAction } from '../actions';

class Wallet extends React.Component {
  render() {
    // const { email } = this.props;
    return (
      <div>
        <header>
          {/* <h6 data-testid="email-field">{email}</h6> */}
          <h6 data-testid="total-field">despesa</h6>
          <h6 data-testid="header-currency-field">cambio</h6>
          {' '}
          {/* requisição API thunk */}
        </header>
      </div>);
  }
}

// const mapStateToProps = (state) => ({
//   userEmail: state.user.email,
// });
// Wallet.propTypes = {
//   email: PropTypes.func.isRequired,
// };

// export default connect(mapStateToProps, null)(Wallet);
export default Wallet;
