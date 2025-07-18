
// export default EmployeesList;
import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../../../Context/AuthContext';
import employeeService from '../../../../services/employee.service';

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const {   employee } = useAuth();

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const token = employee?.employeetoken;
    console.log(token);
    if (!token) {
      setApiError(true);
      setApiErrorMessage('Missing token, please log in.');
      return;
    }

    employeeService
      .getAllEmployees(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401)
            setApiErrorMessage('Please login again to continue');
          else if (res.status === 403)
            setApiErrorMessage('You are not authorized to view this page');
          else
            setApiErrorMessage('Something went wrong, please try again later');
          throw new Error('API error');
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data?.data || []);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, [employee]);

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
        Employees List
      </Typography>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Active</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Added Date</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((emp) => (
                  <TableRow hover key={emp.employee_id}>
                    <TableCell>{emp.active_employee ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{emp.employee_first_name}</TableCell>
                    <TableCell>{emp.employee_last_name}</TableCell>
                    <TableCell>{emp.employee_email}</TableCell>
                    <TableCell>{emp.employee_phone}</TableCell>
                    <TableCell>{emp.added_date}</TableCell>
                    <TableCell>{emp.company_role_name}</TableCell>
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
                  No employee data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default EmployeesList;
