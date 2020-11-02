import React from 'react';
import PropTypes from 'prop-types';

class PaymentMethodForm extends React.Component {
  render() {
    const { genericHandleChange } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method">
        Modo de pagamento:
        <select
          data-testid="method-input"
          id="method"
          name="method"
          className="method"
          onChange={ (event) => genericHandleChange(event) }
        >
          {paymentMethods.map((methods) => (
            <option key={ `${methods}` }>
              {methods}
            </option>))}
        </select>
      </label>
    );
  }
}

PaymentMethodForm.propTypes = {
  genericHandleChange: PropTypes.func.isRequired,
};

export default PaymentMethodForm;
