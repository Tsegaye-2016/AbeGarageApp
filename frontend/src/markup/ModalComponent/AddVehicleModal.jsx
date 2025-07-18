import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import AddVehicleForm from '../components/Admin/AddVehicleForm/AddVehicleForm';
function AddVehicleModal({ show, handleClose }) {
  return (
   <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <AddVehicleForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddVehicleModal
