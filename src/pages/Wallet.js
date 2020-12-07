/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Dropdown, Form, Navbar, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addExpenseLong, editExpense, getCurrencies, removeExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitButtonText: 'Adicionar despesa',
      description: '',
      paymentChoice: 'Payment Method',
      selectedCurrency: 'Currency',
      tag: 'Tag',
      value: 0,
    };

    this.saveExpense = this.saveExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { getCurrenciesProp } = this.props;
    getCurrenciesProp();
  }

  saveExpense() {
    const { addExpenseLongProp } = this.props;
    const { selectedCurrency, paymentChoice, tag, value, description } = this.state;
    console.log(value);
    const expense = {
      description,
      paymentChoice,
      selectedCurrency,
      tag,
      value,
    };
    addExpenseLongProp(expense);
  }

  editExpense() {
    const { expensesProp, editExpenseProp } = this.props;
    const { selectedCurrency, paymentChoice, tag, value, description } = this.state;
    const { id } = this.state;
    expensesProp[id].description = description;
    expensesProp[id].paymentChoice = paymentChoice;
    expensesProp[id].selectedCurrency = selectedCurrency;
    expensesProp[id].tag = tag;
    expensesProp[id].value = value;
    editExpenseProp(expensesProp);
  }

  render() {
    const { totalSpent, userEmail, dropdownList, expensesProp,
      removeExpenseProp } = this.props;
    const { selectedCurrency, paymentChoice, tag, value, description,
      submitButtonText } = this.state;

    if (Object.keys(dropdownList).length === 0) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Trybe Wallet</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text data-testid="email-field">
              Email:
              {userEmail}
            </Navbar.Text>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text data-testid="total-field">{totalSpent}</Navbar.Text>
            <Navbar.Text data-testid="header-currency-field">  BRL</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Navbar bg="dark" variant="dark">
          <Form className="bg-dark" inline>
            <Form.Group>
              <Form.Control
                as="input"
                data-testid="value-input"
                onChange={ (e) => this.setState({ value: parseInt(e.target.value, 10) }) }
                type="number"
                value={ value }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                data-testid="description-input"
                onChange={ (e) => this.setState({ description: e.target.value }) }
                type="text"
                value={ description }
              />
            </Form.Group>
            <Form.Group>
              <Dropdown data-testid="currency-input">
                <Dropdown.Toggle variant="secondary">
                  {selectedCurrency}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.keys(dropdownList).map((item, index) => {
                    if (item !== 'USDT') {
                      return (
                        <Dropdown.Item
                          data-testid={ item }
                          key={ index }
                          onClick={ () => this.setState({ selectedCurrency: item }) }
                        >
                          {item}
                        </Dropdown.Item>
                      );
                    }
                    return null;
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Dropdown data-testid="method-input">
                <Dropdown.Toggle variant="secondary">
                  {paymentChoice}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={ () => {
                      this.setState({ paymentChoice: 'Dinheiro' });
                    } }
                  >
                    Dinheiro
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={ () => {
                      this.setState({ paymentChoice: 'Cartão de crédito' });
                    } }
                  >
                    Cartão de crédito
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={ () => {
                      this.setState({ paymentChoice: 'Cartão de débito' });
                    } }
                  >
                    Cartão de débito
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Dropdown data-testid="tag-input">
                <Dropdown.Toggle variant="secondary">
                  {tag}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={ () => {
                      this.setState({ tag: 'Alimentação' });
                    } }
                  >
                    Alimentação
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={ () => {
                      this.setState({ tag: 'Lazer' });
                    } }
                  >
                    Lazer
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={ () => {
                      this.setState({ tag: 'Trabalho' });
                    } }
                  >
                    Trabalho
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={ () => {
                      this.setState({ tag: 'Transporte' });
                    } }
                  >
                    Transporte
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={ () => {
                      this.setState({ tag: 'Saúde' });
                    } }
                  >
                    Saúde
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Button
                onClick={ (e) => {
                  if (e.target.innerHTML !== 'Editar despesa') {
                    this.saveExpense();
                  } else if (e.target.innerHTML === 'Editar despesa') {
                    this.editExpense();
                  }
                  this.setState({
                    submitButtonText: 'Adicionar despesa',
                  });
                } }
              >
                {submitButtonText}
              </Button>
            </Form.Group>
          </Form>
        </Navbar>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesProp.map((expense, index) => (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.paymentChoice}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.selectedCurrency].name}</td>
                <td>
                  {Number(expense.exchangeRates[expense.selectedCurrency].ask).toFixed(2)}
                </td>
                <td>
                  {(expense.exchangeRates[expense.selectedCurrency]
                    .ask * expense.value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <Button
                    data-testid="edit-btn"
                    onClick={ () => {
                      const obj = expensesProp.find((e) => e.id === expense.id);
                      this.setState({
                        submitButtonText: 'Editar despesa',
                        ...obj,
                      });
                    } }
                  >
                    Editar despesa
                  </Button>
                  <Button
                    data-testid="delete-btn"
                    onClick={ () => removeExpenseProp(expense.id) }
                  >
                    D
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
    totalSpent: state.wallet.total,
    dropdownList: state.wallet.currencies,
    expensesProp: state.wallet.expenses,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesProp: () => dispatch(getCurrencies()),
  addExpenseLongProp: (expense) => dispatch(addExpenseLong(expense)),
  removeExpenseProp: (id) => dispatch(removeExpense(id)),
  editExpenseProp: (expenses) => dispatch(editExpense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
