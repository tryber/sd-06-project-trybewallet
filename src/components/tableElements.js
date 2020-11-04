import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/tableElements.css';

class TableElement extends Component {
  render() {
    const { userTransaction } = this.props;

    return (
      <div className="table-element">
        <table>
          <tbody>
            <tr>
              { userTransaction
                .map((user) => (
                  <td key={ `${user.id}${user.description}` }>
                    { user.description }
                  </td>
                )) }
              { userTransaction
                .map((user) => <td key={ user.id + user.tag }>{ user.tag }</td>) }
              { userTransaction
                .map((user) => <td key={ user.id + user.method }>{ user.method }</td>) }
              { userTransaction
                .map((user) => (
                  <td key={ user.id + user.value }>
                    { user.value }
                  </td>
                )) }
              { userTransaction
                .map((user) => <td key={ `${user.id} real` }>Real</td>) }
              { userTransaction
                .map((user) => (
                  <td key={ user.id + user.currency }>
                    { user.exchangeRates[user.currency].name }
                  </td>
                )) }
              { userTransaction
                .map((user) => (
                  <td key={ user.id + user.currency }>
                    { Number(user.exchangeRates[user.currency].ask).toFixed(2) }
                  </td>
                )) }
              { userTransaction
                .map((user) => (
                  <td key={ `${user.id} converted` }>
                    { Number(user.exchangeRates[user.currency].ask) * Number(user.value) }
                  </td>
                )) }
            </tr>
          </tbody>
        </table>
        <button type="button">Editar/Excluir</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userTransaction: state.wallet.expenses,
});

TableElement.propTypes = {
  userTransaction: PropTypes.arrayOf(
    PropTypes.shape([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

export default connect(mapStateToProps, null)(TableElement);
