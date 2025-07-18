import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddCustomerForm from '../components/Admin/AddCustomerForm/AddCustomerForm';

function AddCustomerModal({ show, handleClose, customerData, onCustomerSaved }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      {/* <Modal.Header closeButton>
        <Modal.Title>{customerData ? "Update Customer" : "Add Customer"}</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <AddCustomerForm
          customerData={customerData}
          onClose={handleClose}
          onCustomerSaved={onCustomerSaved}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCustomerModal;
