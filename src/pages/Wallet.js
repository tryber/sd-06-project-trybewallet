import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import { fetchData } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  render() {
    return (
      <div>
        <Header />
        <ExpensesForm />
        <ExpensesTable />
      </div>
    );
  }
}

const mapDispatachToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchData()),
});

export default connect(null, mapDispatachToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrency: PropTypes.func.isRequired,
};
