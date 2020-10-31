import React from 'react';

export default class Table extends React.Component {
  render() {
    return (
      <div className="md:px-10 py-1">
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <table className="bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Descrição
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Tag
                </th>
                <th className="  text-left py-3 px-4 uppercase font-semibold text-sm">
                  Método de pagamento
                </th>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Valor
                </th>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Moeda
                </th>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Câmbio utilizado
                </th>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Valor convertido
                </th>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Moeda de conversão
                </th>
                <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                  Editar/Excluir
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="text-left py-3 px-4">Lian</td>
                <td className="text-left py-3 px-4">Smith</td>
                <td className="text-left py-3 px-4">
                  <a className="hover:text-blue-500" href="tel:622322662">622322662</a>
                </td>
                <td className="text-left py-3 px-4">
                  <a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">
                    jonsmith@mail.com
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
