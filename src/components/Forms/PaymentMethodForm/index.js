import React from 'react';

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

export default PaymentMethodForm;
