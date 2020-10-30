import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: 0,
      currency: 'BRL',
      paymentMethod: 'Dinheiro',
      tag: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { expense } = this.state;
    return (
      <form>
        <label htmlFor="expense">
          Valor:
          <input
            name="expense"
            type="number"
            data-testid="value-input"
            value={ expense }
          />
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
