import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddProviderModal = ({ show, handleClose, setProviders }) => {

  const API = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API, {
        name,
        contact_info: {
          email,
          phone
        }
      });
      setProviders(prevProviders => [...prevProviders, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding provider:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre del Proveedor</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">Agregar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddProviderModal;
