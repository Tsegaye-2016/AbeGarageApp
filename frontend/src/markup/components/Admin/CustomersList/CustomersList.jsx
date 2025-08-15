import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Alert, Typography, Box, IconButton, Button,TableFooter
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../../Context/AuthContext';
import customerService from '../../../../services/customer.service';
import AddCustomerModal from '../../../ModalComponent/AddCustomerModal';
import { useNavigate } from 'react-router-dom';
function CustomersList({ customer ,loggedInEmployeeToken }) {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const { employee } = useAuth();
  const navigate = useNavigate();
  const token = employee?.employeetoken;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // const fetchCustomers = () => {
  //   customerService.getCustomers(token)
  //     .then((res) => {
  //       if (!res.ok) {
  //         setApiError(true);
  //         if (res.status === 401) setApiErrorMessage('Please Login again');
  //         else if (res.status === 403) setApiErrorMessage('Not authorized');
  //         else setApiErrorMessage('Something went wrong');
  //         throw new Error('API error');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCustomers(data?.data || []);
  //     })
  //     .catch(console.error);
  // };
const fetchCustomers = async () => {
  try {
    const res = await customerService.getCustomers(token);
    if (!res.ok) {
      setApiError(true);
      if (res.status === 401) setApiErrorMessage('Please Login again');
      else if (res.status === 403) setApiErrorMessage('Not authorized');
      else setApiErrorMessage('Something went wrong');
      throw new Error('API error');
    }
  console.log('Fetching customers...');
    const data = await res.json();
    setCustomers(data?.data || []);
  console.log('Customers fetched:', data?.data?.length);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchCustomers();
  }, [token]);
const handleDelete = async (customer_hash) => {
        const confirmed = window.confirm('Are you sure you want to delete this customer?');
        if (!confirmed) return;

        const formData = { customer_hash };
        console.log('Deleting customer with hash:', customer_hash);
        const response = await customerService.deleteCustomer(formData, loggedInEmployeeToken);

        if (response.ok) {
            setCustomers(prev => prev.filter(c => c.customer_hash !== customer_hash));
            alert('Customer deleted successfully.');
        } else {
            const result = await response.json();
            alert('Failed to delete customer: ' + (result.error || 'Unknown error'));
        }
    };
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCustomerSaved = async () => {
  setPage(0); 
  await fetchCustomers();       
  setShowModal(false);
  console.log('Customer list refreshed and modal closed');          
  };

// console.log('Submitting form with data:', formData);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (apiError) {
    return <Box sx={{ p: 4 }}><Alert severity="error">{apiErrorMessage}</Alert></Box>;
  }

  return (
    <Box>
      <AddCustomerModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        customerData={selectedCustomer}
        onCustomerSaved={handleCustomerSaved}
      />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Customer List
        </Typography>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Added Date</TableCell>
                <TableCell>Active</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.length > 0 ? (
                customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer) => (
                    <TableRow hover key={customer.customer_id}>
                      <TableCell>{customer.customer_id}</TableCell>
                      <TableCell style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => navigate(`/admin/customers/${customer.customer_id}`)}>{customer.customer_first_name}</TableCell>
                      <TableCell>{customer.customer_last_name}</TableCell>
                      <TableCell>{customer.customer_email}</TableCell>
                      <TableCell>{customer.customer_phone_number}</TableCell>
                      <TableCell>{customer.customer_added_date}</TableCell>
                      <TableCell>{customer.active_customer_status ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleEdit(customer)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(customer.customer_hash)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No customer data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
              </TableRow>
            </TableFooter> */}
          </Table>
        </TableContainer>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
      </Paper>
    </Box>
  );
}

export default CustomersList;
