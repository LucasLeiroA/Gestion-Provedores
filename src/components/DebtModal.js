import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DebtModal = ({ show, handleClose, provider, handleDeleteDebt }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deudas de {provider.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {provider.debt_details.map((debt, index) => (
              <tr key={index}>
                <td>{new Date(debt.date).toLocaleDateString()}</td>
                <td>{debt.amount}</td>
                <td>{debt.description}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteDebt(provider, debt)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DebtModal;
