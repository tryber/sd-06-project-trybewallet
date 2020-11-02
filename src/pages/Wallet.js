import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { nomeDaProps } = this.props;
    return <div>{ nomeDaProps }</div>;
  }
}

const mapStateToProps = (state) => ({
  nomeDaProps: state.wallet.helloWorld,
});

Wallet.propTypes = {
  nomeDaProps: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
