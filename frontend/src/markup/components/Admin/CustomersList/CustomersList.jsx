import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Alert, Typography, Box, IconButton, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../../Context/AuthContext';
import customerService from '../../../../services/customer.service';
import AddCustomerModal from '../../../ModalComponent/AddCustomerModal';

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const { employee } = useAuth();
  const token = employee?.employeetoken;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = () => {
    customerService.getCustomers(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) setApiErrorMessage('Please Login again');
          else if (res.status === 403) setApiErrorMessage('Not authorized');
          else setApiErrorMessage('Something went wrong');
          throw new Error('API error');
        }
        return res.json();
      })
      .then((data) => {
        setCustomers(data?.data || []);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (token) fetchCustomers();
  }, [token]);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleCustomerSaved = () => {
    fetchCustomers(); // Refresh data
  };

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
      {/* <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
        Add Customer
      </Button> */}

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
                      <TableCell>{customer.customer_first_name}</TableCell>
                      <TableCell>{customer.customer_last_name}</TableCell>
                      <TableCell>{customer.customer_email}</TableCell>
                      <TableCell>{customer.customer_phone_number}</TableCell>
                      <TableCell>{customer.customer_added_date}</TableCell>
                      <TableCell>{customer.active_customer_status ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleEdit(customer)}>
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
                    No customer data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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
