import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import AddOrderForm from '../components/Admin/AddOrderForm/AddOrderForm';
function AddOrderModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <AddOrderForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddOrderModal
