import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletTableBody extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <tbody>
        {
          (expenses)
            ? expenses.map((exp) => (
              <tr key={ exp.currency }>
                <td>{ exp.description }</td>
                <td>{ exp.tag }</td>
                <td>{ exp.method }</td>
                <td>{ exp.value }</td>
                <td>{ exp.exchangeRates[exp.currency].name }</td>
                <td>{ parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                <td>
                  {
                    (exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)
                  }
                </td>
                <td> Real </td>
                <td> O/X </td>
              </tr>
            ))
            : ''
        }
      </tbody>
    );
  }
}

WalletTableBody.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WalletTableBody;
