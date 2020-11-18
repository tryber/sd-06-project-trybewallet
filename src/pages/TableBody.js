import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableBody extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <tbody>
        {
          (expenses)
            ? expenses.map((item) => (
              <tr key={ item.currency }>
                <td>{ item.description }</td>
                <td>{ item.tag }</td>
                <td>{ item.method }</td>
                <td>{ item.value }</td>
                <td>{ item.exchangeRates[item.currency].name }</td>
                <td>{ parseFloat(item.exchangeRates[item.currency].ask).toFixed(2) }</td>
                <td>
                  {
                    (item.exchangeRates[item.currency].ask * item.value).toFixed(2)
                  }
                </td>
                <td> Real </td>
                <td> --- </td>
              </tr>
            ))
            : ''
        }
      </tbody>
    );
  }
}

TableBody.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;
