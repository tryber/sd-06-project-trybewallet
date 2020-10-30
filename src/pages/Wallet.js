import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h4>{`Email: ${email}`}</h4>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: propTypes.func.isRequired,
};
