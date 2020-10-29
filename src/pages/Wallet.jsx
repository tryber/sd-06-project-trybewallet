import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Wallet = ({ user }) => {
  if (!user) {
    return <div>NOT LOGGED</div>;
  }

  return <div>{user}</div>;
};

function mapStateToProps(state) {
  return {
    user: state.user.user.email,
  };
}

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
