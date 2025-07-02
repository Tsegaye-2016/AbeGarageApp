// components/Admin/AddEmployee/AddEmployeeModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddEmployeeForm from '../components/Admin/AddEmployeeForm/AddEmployeeForm';

function AddEmployeeModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddEmployeeForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEmployeeModal;
