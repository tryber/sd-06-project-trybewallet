import React from 'react';

class PaymentMethodForm extends React.Component {
  render() {
    const { paymentOnChange } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="payment-method">
        Modo de pagamento:
        <select
          data-testid="method-input"
          id="payment-method"
          name="payment-method"
          className="payment-method"
          onChange={ ({ target }) => paymentOnChange(target.value) }
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
