import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import AddServiceForm from '../components/Admin/AddServiceForm/AddServiceForm';
function AddServiceModal({show, handleClose, serviceData, onServiceSaved}) {

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        {/* <Modal.Title>Add New Employee</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <AddServiceForm 
          serviceData={serviceData}
          onClose={handleClose}
          onServiceSaved={onServiceSaved}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddServiceModal
