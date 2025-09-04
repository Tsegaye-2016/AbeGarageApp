import React,{ useState,useEffect} from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Alert, Typography, Box, IconButton, Button,TableFooter
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import appointmentService from '../../../../services/appointment.service';
import { data } from 'react-router';
import AddAppointmentModal from '../../../ModalComponent/AddAppointmentModal';
function AppointmentList() {
    const [appointments, setAppointment] = useState([]);
    const [apiError, setApiError] = useState('');
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const fetchAppointments = async () =>{
        try {
            const res = await appointmentService.getAllAppointment();
            if(!res.ok){
                setApiError(true);
                if (res.status === 401) setApiErrorMessage('Please Login again');
                else if (res.status === 403) setApiErrorMessage('Not authorized');
                else setApiErrorMessage('Something went wrong');
                throw new Error('API error');
            }
            const data = await res.json();
            setAppointment(data?.data || []);
        } catch (error) {
           console.log(error); 
        }
    }

     const handleEdit = (appointment) => {
      console.log('Editing appointment:', appointment);
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleAppointmentSaved = async () => {
  await fetchAppointments();
  setPage(0);        
  setShowModal(false);         
  };
     const handleChangePage = (event, newPage) => setPage(newPage);
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    
      if (apiError) {
        return <Box sx={{ p: 4 }}><Alert severity="error">{apiErrorMessage}</Alert></Box>;
      }
    
    useEffect(() => {
        fetchAppointments();
    }, []);
  return (  
    
    <Box>
      <AddAppointmentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        appointmentData={selectedAppointment}
        onAppointmentSaved={handleAppointmentSaved}
      />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Appointment List
        </Typography>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Customer Id</TableCell>
                <TableCell>Vehicle Id</TableCell>
                <TableCell>Service Id</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time Slot</TableCell>
                <TableCell>Employee Id</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length > 0 ? (
                appointments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((appointment) => (
                    <TableRow hover key={appointment.id}>
                      <TableCell>{appointment.id}</TableCell>
                      <TableCell>{appointment.customer_id}</TableCell>
                      <TableCell>{appointment.vehicle_id}</TableCell>
                      <TableCell>{appointment.service_id}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time_slot}</TableCell>
                      <TableCell>{appointment.employee_id}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>{appointment.notes}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleEdit(appointment)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No Appointment data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={appointments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
      </Paper>
    </Box>
  )
}

export default AppointmentList
