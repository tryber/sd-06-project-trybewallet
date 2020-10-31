import React from 'react';

/* IMG */
import navLogo from '../img/trybe-logo.png';

import Table from './Table';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <nav className="flex justify-center lg:justify-between lg:mx-10 mt-3 bg-white">
          <div className="h-8 w-32 ml-4 my-2">
            <img src={ navLogo } className="" alt="nav-logo" />
          </div>
          <div className="flex items-center mr-4 space-x-40">
            <div>Email:</div>
            <div>Despesa total:</div>
          </div>
        </nav>
        <section>
          <form
            className="
            flex
              justify-around
                items-center
                lg:mx-10 bg-gray-800
                  text-white"
          >
            <div className="flex">
              <label htmlFor="value">
                Valor:
                <input
                  id="value"
                  type="number"
                  className="w-12 text-black rounded ml-2 outline-none p-1"
                />
              </label>
            </div>

            <div className="flex">
              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  className="text-black rounded outline-none ml-2 p-1"
                >
                  <option>R$</option>
                </select>
              </label>
            </div>

            <div className="flex">
              <label htmlFor="payment">
                Método de pagamento:
                <select id="payment" className="text-black rounded outline-none ml-2 p-1">
                  <option value="">Dinheiro</option>
                  <option value="">Cartão de crédito</option>
                  <option value="">Cartão de débito</option>
                </select>
              </label>
            </div>

            <div className="flex">
              <label htmlFor="tag">
                Tag:
                <select id="tag" className="text-black rounded outline-none ml-2 p-1">
                  <option value="">Alimentação</option>
                  <option value="">Trabalho</option>
                  <option value="">Lazer</option>
                  <option value="">Transporte</option>
                  <option value="">Saúde</option>
                </select>
              </label>
            </div>

            <div className="flex">
              <label htmlFor="description">
                Descrição:
                <input
                  type="text"
                  id="description"
                  className="text-black rounded ml-2 outline-none p-1"
                />
              </label>
            </div>

            <button
              type="button"
              className="
               hover:bg-green-500
                text-green-700
                  hover:text-white
                  py-2 px-4 border
                    border-green-500
                    hover:border-transparent rounded
                    my-3"
            >
              Adicionar despesa
            </button>
          </form>
        </section>
        <Table />
      </section>
    );
  }
}

export default Wallet;
