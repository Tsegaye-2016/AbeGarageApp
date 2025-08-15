// components/Admin/AddEmployee/AddEmployeeModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddEmployeeForm from '../components/Admin/AddEmployeeForm/AddEmployeeForm';

function AddEmployeeModal({ show, handleClose,employeeData, onEmployeeSaved }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      {/* <Modal.Header closeButton>
        <Modal.Title>Add New Employee</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <AddEmployeeForm 
          employeeData={employeeData}
          onClose={handleClose}
          onEmployeeSaved={onEmployeeSaved}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEmployeeModal;
