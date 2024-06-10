import React, { useState, useEffect } from 'react';
import './App.css'; // Estilos CSS personalizados
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import ProviderTable from './components/ProviderTable';
import AddProviderModal from './components/AddProviderModal';
import DebtModal from './components/DebtModal';
import PaymentModal from './components/PaymentModal';
import InputModalDeb from './components/InputModalDebt';
import InputModalPay from './components/inputModalPay';
import axios from 'axios';


function App() {

  const API = process.env.REACT_APP_API_URL;
// Verifica que la URL se imprime correctamente

 
  const [providers, setProviders] = useState([]);

  const [showAddProviderModal, setShowAddProviderModal] = useState(false);

  const [showDebtModal, setShowDebtModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [debModal, setDebModal] = useState(false);
  const [payModal, setPayModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null);
  

  useEffect(() => {
    const fetchProviders = async () => {
      try {
     
        const response = await axios.get(API); // URL del backend
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, [API , debModal , payModal]); // El segundo argumento [] asegura que el efecto se ejecute solo una vez, al montar el componente

  // Funciones para mostrar/ocultar modales y cargar datos del proveedor seleccionado
  const handleShowAddProviderModal = () => setShowAddProviderModal(true);
  const handleCloseAddProviderModal = () => setShowAddProviderModal(false);

  const handleShowDebtModal = (provider) => {
    setShowDebtModal(true);
    setSelectedProvider(provider);
  }
  const handleCloseDebtModal = () => setShowDebtModal(false);
  
  const handleShowPaymentModal = (provider) => {
    setShowPaymentModal(true);
    setSelectedProvider(provider);
  }
  const handleClosePaymentModal = () => setShowPaymentModal(false);


    const handleDeleteDebt = async (provider, debt) => {
        try {
            // Realizar la solicitud DELETE al backend para eliminar la deuda
            const response = await axios.delete(`http://localhost:5000/providers/${provider._id}/debts/${debt._id}`);
            
            // Verificar si la solicitud fue exitosa
            if (response.status === 200) {
                
                // Actualizar la lista de proveedores después de eliminar la deuda
                const updatedProviders = providers.map(p => {
                    if (p._id === provider._id) {
                        // Eliminar la deuda del proveedor actual
                        p.debt_details = p.debt_details.filter(d => d._id !== debt._id);
                        // Actualizar el total de deudas del proveedor
                        p.total_debt -= debt.amount;
                    }
                    return p;
                });
                setProviders(updatedProviders); // Actualizar el estado con la lista actualizada de proveedores
            }
        } catch (error) {
            console.error('Error eliminando deuda:', error);
        }
    };
    const handleDeletePayment = async (provider, payment) => {
      try {
          // Realizar la solicitud DELETE al backend para eliminar el pago
          const response = await axios.delete(`http://localhost:5000/providers/${provider._id}/payments/${payment._id}`);
          
          // Verificar si la solicitud fue exitosa
          if (response.status === 200) {
      
              // Actualizar la lista de proveedores después de eliminar el pago
              const updatedProviders = providers.map(p => {
                  if (p._id === provider._id) {
                      // Eliminar el pago del proveedor actual
                      p.payment_details = p.payment_details.filter(p => p._id !== payment._id);
                      // Actualizar el total de pagos y deudas del proveedor
                      p.total_payments -= payment.amount;
                      p.total_debt += payment.amount;
                  }
                  return p;
              });
              setProviders(updatedProviders); // Actualizar el estado con la lista actualizada de proveedores
          }
      } catch (error) {
          console.error('Error eliminando pago:', error);
      }
      
    };

  const handleShowInputModalDeb = (provider) =>{
    setDebModal(true);
    setSelectedProvider(provider);
  }
  const handleCloseInputModalDeb = () =>  setDebModal(false);

  const handleShowInputModalPay = (provider) => {
    setPayModal(true);
    setSelectedProvider(provider);
  }

  const handleCloseInputModalPay = () =>  setPayModal(false);

  const handleDeleteProvider = async (provider) =>{
    const response = await axios.delete(`${API}/${provider._id}`);
    setProviders(response.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Proveedores</h1>
        <button onClick={handleShowAddProviderModal} className="btn btn-primary mb-3">Agregar Proveedor</button>
        <ProviderTable
          providers={providers}
          handleShowDebtModal={handleShowDebtModal}
          handleShowPaymentModal={handleShowPaymentModal}
          handleShowInputModalDeb = {handleShowInputModalDeb}
          handleShowInputModalPay = {handleShowInputModalPay}
          handleDeleteProvider={handleDeleteProvider}
        />
      </header>

      <AddProviderModal
        show={showAddProviderModal}
        handleClose={handleCloseAddProviderModal}
        setProviders={setProviders}
      />

      {selectedProvider && (
        <>
          <DebtModal
            show={showDebtModal}
            handleClose={handleCloseDebtModal}
            provider={selectedProvider}
            handleDeleteDebt={handleDeleteDebt}
          />

          <PaymentModal
            show={showPaymentModal}
            handleClose={handleClosePaymentModal}
            provider={selectedProvider}
            handleDeletePayment ={handleDeletePayment}
          />
          <InputModalDeb
           show = {debModal}
           provider={selectedProvider}
           handleClose = {handleCloseInputModalDeb}
          />
          <InputModalPay
          show = {payModal}
          provider={selectedProvider}
          handleClose={handleCloseInputModalPay}
          />
        </>
      )}
    </div>
  );
}

export default App;
