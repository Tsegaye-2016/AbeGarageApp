import React, { useState, useEffect } from 'react'
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
import orderService from '../../../../services/order.service';
function OrderList() {
    const [orders, setOrders] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const {   employee } = useAuth();
    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(()=>{
        const token = employee?.employeetoken;
        const orders = orderService.getAllOrders(token)
        .then((res)=>{
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
        .then((data)=>{
            setOrders(data?.data || []);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[employee]);
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

        if (apiError) {
            return (
              <Box sx={{ p: 4 }}>
                <Alert severity="error">{apiErrorMessage}</Alert>
              </Box>
            );
          }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Orders List
      </Typography>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Employee Id</TableCell>
              <TableCell>Customer Id</TableCell>
              <TableCell>Vehicle Id</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Active Order</TableCell>
              <TableCell>Order Total Price</TableCell>
              <TableCell>Estimated Completed Date</TableCell>
              <TableCell>Cmpletion Date</TableCell>
              <TableCell>Additional Request</TableCell>
              <TableCell>Notes For Internal Use</TableCell>
              <TableCell>Notes For Customer</TableCell>
              <TableCell>Additional Request Completed</TableCell>
              <TableCell>Service Completed</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow hover key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.employee_id}</TableCell>
                    <TableCell>{order.customer_id}</TableCell>
                    <TableCell>{order.vehicle_id}</TableCell>
                    <TableCell>{order.order_date}</TableCell>
                    <TableCell>{order.active_order}</TableCell>
                    <TableCell>{order.order_total_price}</TableCell>
                    <TableCell>{order.estimated_completion_date}</TableCell>
                    <TableCell>{order.completion_date}</TableCell>
                    <TableCell>{order.additional_request}</TableCell>
                    <TableCell>{order.notes_for_internal_use}</TableCell>
                    <TableCell>{order.notes_for_customer}</TableCell>
                    <TableCell>{order.additional_requests_completed}</TableCell>
                    <TableCell>{order.service_completed}</TableCell>
                    <TableCell>{order.order_status}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" size="small">
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
                  No Order data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default OrderList
