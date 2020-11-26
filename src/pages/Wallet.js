import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Forms from '../components/forms';
import Table from '../components/table';

class Wallet extends React.Component {
  render() {
    const { checked } = this.props;
    return (
      <div>
        <Header />
        {checked === true ? null : <Forms />}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  checked: state.wallet.checked,
});

Wallet.propTypes = {
  checked: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
