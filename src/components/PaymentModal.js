import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, provider, handleDeletePayment }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Pagos de {provider.name}</Modal.Title>
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
            {provider.payment_details.map((payment, index) => (
              <tr key={index}>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>{payment.amount}</td>
                <td>{payment.description}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeletePayment(provider, payment)}>Eliminar</button>
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

export default PaymentModal;
