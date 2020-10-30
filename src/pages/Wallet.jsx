import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FiDollarSign, FiPenTool, FiStopCircle, FiEdit } from 'react-icons/fi';

import { createTransaction, removeTransaction, loadCurrencies, updateTransaction } from '../actions';
import formatValue from '../utils/formatValue';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

import { WalletProps } from '../types/appTypes';

import '../styles/wallet.css';

const Wallet = ({ user, transactions, register, remove, currencies, load, update }) => {
// if (!user) {
//   return <div>NOT LOGGED</div>;
// }

  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('credit');
  const [tag, setTag] = useState('food');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    load();
  }, [load]);

  const handleValueChange = useCallback(({ target }) => {
    setValue(target.value);
  }, [setValue]);

  const handleCurrencyChange = useCallback(({ target }) => {
    setCurrency(target.value);
  }, [setCurrency]);

  const handleMethodChange = useCallback(({ target }) => {
    setMethod(target.value);
  }, [setMethod]);

  const handleCategoryChange = useCallback(({ target }) => {
    setTag(target.value);
  }, [setTag]);

  const handleDescriptionChange = useCallback(({ target }) => {
    setDescription(target.value);
  }, [setDescription]);

  const handleEdit = useCallback((transactionID) => {
    setEditMode(true);

    const editTransaction = transactions.find((transaction) => (
      transactionID === transaction.id
    ));

    setValue(editTransaction.value);
    setMethod(editTransaction.method);
    setTag(editTransaction.tag);
    setCurrency(editTransaction.currency);
    setDescription(editTransaction.description);
    setEditID(transactionID);
  }, [transactions, editID]);

  const handleTransactionDeletion = useCallback((transactionID) => {
    remove(transactionID);
  }, [remove]);

  const handleTransactionCreation = useCallback((formEvent) => {
    formEvent.preventDefault();

    if (!Number(value) || !value || !description) return;

    const transactionData = {
      value,
      tag,
      description,
      currency,
      method,
    };

    if (editMode) {
      update(transactionData, editID);
      setEditMode(false);
    } else {
      register(transactionData);
    }

    setValue(0);
    setDescription('');
    setEditID(null);
  }, [value, tag, description, currency, method, editID, register, update, setValue,
    setDescription, setEditID,
  ]);

  return (
    <>
      <Header />
      <div className="wallet-content">
        <form method="POST" onSubmit={ handleTransactionCreation }>
          <div className="wallet-input">
            <label htmlFor="value">Valor:</label>
            <Input
              id="value"
              name="value"
              type="number"
              value={ value }
              onChange={ handleValueChange }
              icon={ FiDollarSign }
              data-testid="value-input"
            />
          </div>
          <div className="wallet-input">
            <label htmlFor="currency">Moeda:</label>
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ handleCurrencyChange }
            >
              {currencies.map((currName) => (
                <option key={ currName } value={ currName } data-testid={ currName }>
                  {currName}
                </option>
              ))}
            </select>
          </div>
          <div className="wallet-input">
            <label htmlFor="method">Método:</label>
            <select
              id="method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ handleMethodChange }
            >
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </div>
          <div className="wallet-input">
            <label htmlFor="tag">Categoria:</label>
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ handleCategoryChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
          <div className="wallet-input">
            <label htmlFor="value">Detalhes:</label>
            <Input
              id="value"
              name="value"
              icon={ FiPenTool }
              data-testid="description-input"
              value={ description }
              onChange={ handleDescriptionChange }
            />
          </div>
          <Button type="submit">
            {editMode ? ('Editar despesa') : ('Adicionar despesa')}
          </Button>
        </form>
        <div className="transactions-table">
          <table>
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
              {transactions.map((transaction) => {
                const exValue = transaction.exchangeRates[transaction.currency].ask;
                const currName = transaction.exchangeRates[transaction.currency].name;

                return (
                  <tr key={ transaction.id }>
                    <td className="field">{transaction.description}</td>
                    <td className="field">{transaction.tag}</td>
                    <td className="field">{transaction.method}</td>
                    <td className="outcome">
                      {/* {`${formatValue(Number(transaction.value))}`} */}
                      {transaction.value}
                    </td>
                    <td className="field">{currName}</td>
                    <td className="field">
                      {formatValue(Number(exValue))}
                    </td>
                    <td className="field">
                      {formatValue(exValue * transaction.value)}
                    </td>
                    <td className="field">Real</td>
                    <td className="field">
                      <div className="modify-btns">
                        <button
                          type="button"
                          data-testid="edit-btn"
                          id={ transaction.id }
                          className="edit-btn"
                          onClick={ () => handleEdit(transaction.id) }
                        >
                          <FiEdit />
                        </button>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          id={ transaction.id }
                          onClick={ () => handleTransactionDeletion(transaction.id) }
                        >
                          <FiStopCircle />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.email,
    transactions: state.wallet.expenses,
    currencies: state.wallet.currencies,
  };
}

function dispatchToStore(dispatch) {
  return {
    register: (transactionData) => dispatch(createTransaction(transactionData)),
    remove: (transactionID) => dispatch(removeTransaction(transactionID)),
    load: () => dispatch(loadCurrencies()),
    update: (transactionData, id) => dispatch(updateTransaction(transactionData, id)),
  };
}

Wallet.propTypes = WalletProps;

export default connect(mapStateToProps, dispatchToStore)(Wallet);
