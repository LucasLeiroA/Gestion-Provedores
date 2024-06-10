import React from 'react';

const ProviderTable = ({ providers,  handleShowDebtModal, handleShowPaymentModal, handleDeleteProvider , handleShowInputModalDeb , handleShowInputModalPay}) => {
 
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre del Proveedor</th>
          <th>Total de Deudas</th>
          <th>Total de Pagos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {providers.map(provider => (
          
          <tr key={provider._id} >
            <td>{provider.name}  <button onClick={() => handleDeleteProvider(provider)} className="btn btn-danger">Eliminar</button></td>
            <td>{provider.total_debt} <button onClick={() => handleShowDebtModal(provider)} className="btn btn-info">Detalle</button></td>
            <td>{provider.total_payments} <button onClick={() => handleShowPaymentModal(provider)} className="btn btn-info">Detalle</button></td>
            <td>
              <button onClick={() => handleShowInputModalDeb(provider)} className="btn btn-warning mr-2">Agregar Deuda</button>
              <button onClick={() => handleShowInputModalPay(provider)} className="btn btn-success mr-2">Agregar Pago</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProviderTable;
