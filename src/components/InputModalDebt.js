import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const InputModalDeb = ({ show, handleClose,  provider }) => {


  const API = process.env.REACT_APP_API_URL;
  const [amount, setAmout] = useState('');
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`${API}/${provider._id}/debts`, {
        amount: amount,
        description : description,
      });
      
      setAmout("")
      setDescription("")
      handleClose();
    } catch (error) {
      console.error('Error adding provider:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Deuda a {provider.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Monto de la deuda</Form.Label>
            <Form.Control type="number" value={amount} onChange={(e) => setAmout(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">Agregar</Button>
        </Form>
        
      </Modal.Body>
    </Modal>
  );
}

export default InputModalDeb;
