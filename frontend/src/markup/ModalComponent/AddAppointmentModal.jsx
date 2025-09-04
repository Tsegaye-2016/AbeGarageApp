import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import AddAppointmentForm from '../components/Admin/AddAppointmentForm/AddAppointmentForm';
function AddAppointmentModal({ show, handleClose, appointmentData, onAppointmentSaved }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      {/* <Modal.Header closeButton>
        <Modal.Title>{appointmentData ? "Update Appointment" : "Add Appointment"}</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <AddAppointmentForm
        appointmentData={appointmentData}
        handleClose={handleClose}
        onAppointmentSaved={onAppointmentSaved}
      />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddAppointmentModal
