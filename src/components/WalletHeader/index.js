import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesThunk } from '../../actions';

import WalletWelcome from '../WalletWelcome';
import WalletTable from '../WalletTable';

class WalletHeader extends React.Component {
  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  render() {
    return (
      <main>
        <div className="welcome-container">
          <WalletWelcome />
        </div>
        <div className="table-container">
          <WalletTable />
        </div>
        <div className="display-wallet">
          Aqui os valores inseridos pelo usuário e transformados pela API
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(currenciesThunk()),
});

WalletHeader.propTypes = {
  getCurrency: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletHeader);
