import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import AddOrderForm from '../components/Admin/AddOrderForm/AddOrderForm';
function AddOrderModal({ show, handleClose, onOrderSaved }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <AddOrderForm 
          handleClose={handleClose}
          onOrderSaved={onOrderSaved}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddOrderModal
