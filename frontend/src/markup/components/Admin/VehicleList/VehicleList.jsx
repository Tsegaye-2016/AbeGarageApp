import React,{useState,useEffect} from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Alert,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAuth} from '../../../../Context/AuthContext';
import vehicleService from '../../../../services/vehicle.service';
import { useParams } from 'react-router-dom';
import AddVehicleModal from '../../../ModalComponent/AddVehicleModal';
function VehicleList() {
    const [vehicles,setVehicles]= useState([]);
    const {apiError, setApiError}= useState(false);
    const {apiErrorMessage, setApiErrorMessage}= useState('');
    const {employee} = useAuth();
    const { customer_id } = useParams();
     //pagination 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const fetchVehicles = async () => {
      const token = employee?.employeetoken;
        if (!customer_id || !token) return;
        vehicleService.getVehicles(customer_id,token)
        .then((res) =>{
            if(!res.ok){
                setApiError(true);
                if(res.status === 401){
                    setApiErrorMessage('Please Login again to Continue');
                }else if(res.status === 403){
                    setApiErrorMessage('You are not authorized to view this page')
                }else{
                setApiErrorMessage('Something went wrong, please try again later');
                }
          throw new Error('API error');
            }
            return res.json();
        })
        .then((data) => {
            setVehicles(data?.data || []);
            console.log(data);
        })
        .catch((error) => {
            console.error('API error:', error);
        });
    }
    useEffect(() =>{
        fetchVehicles();
    },[employee]);
    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowModal(true);
    }

    const handleVehicleOnSaved = async () => {
        await fetchVehicles();
        setShowModal(false);
    }
        const handleChangePage = (event, newPage) => setPage(newPage);
        const handleChangeRowsPerPage = (event) =>{
          setRowsPerPage(+event.target.value);
          setPage(0);
        }
        if (apiError) {
            return (
              <Box sx={{ p: 4 }}>
                <Alert severity="error">{apiErrorMessage}</Alert>
              </Box>
            );
          }
  return (
    <Box>
      <AddVehicleModal 
          show = {showModal}
          handleClose = {() => setShowModal(false)}
          vehicleData = {selectedVehicle}
          onVehicleSaved = {() => handleVehicleOnSaved(false)}
      />
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Vehicle List
      </Typography>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="Vehicle table">
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Id</TableCell>
              <TableCell>Customer Id</TableCell>
              <TableCell>Vehicle Year</TableCell>
              <TableCell>Vehicle Make</TableCell>
              <TableCell>Vehicle Model</TableCell>
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Vehicle Mileage</TableCell>
              <TableCell>Vehicle Tag</TableCell>
              <TableCell>Vehicle Serial</TableCell>
              <TableCell>Vehicle Color</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.length > 0 ? (
              vehicles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((vehicle) => (
                  <TableRow hover key={vehicle.vehicle_id}>
                    <TableCell>{vehicle.vehicle_id}</TableCell>
                    <TableCell>{vehicle.customer_id}</TableCell>
                    <TableCell>{vehicle.vehicle_year}</TableCell>
                    <TableCell>{vehicle.vehicle_make}</TableCell>
                    <TableCell>{vehicle.vehicle_model}</TableCell>
                    <TableCell>{vehicle.vehicle_type}</TableCell>
                    <TableCell>{vehicle.vehicle_mileage}</TableCell>
                    <TableCell>{vehicle.vehicle_tag}</TableCell>
                    <TableCell>{vehicle.vehicle_serial}</TableCell>
                    <TableCell>{vehicle.vehicle_color}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" size="small" onClick={() => handleEdit(vehicle)}>
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton color="error" size="small">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Vehicle data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={vehicles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
  )
}

export default VehicleList
