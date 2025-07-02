import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { format } from 'date-fns';
import { useAuth } from '../../../../Context/AuthContext';
import employeeService from '../../../../services/employee.service';

function EmployeesList() {
  const [employees, setEmployees] = useState([]); // ✅ important
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const { employee } = useAuth();

  useEffect(() => {
    console.log("Employe data",employee);
    const token = employee.employeetoken;
    if (!token) {
      setApiError(true);
      setApiErrorMessage("Missing token, please log in.");
      return;
    }

    employeeService.getAllEmployees(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) setApiErrorMessage("Please login again to continue");
          else if (res.status === 403) setApiErrorMessage("You are not authorized to view this page");
          else setApiErrorMessage("Something went wrong, please try again later");
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data) {
          setEmployees(data.data); // ✅ ensure it's always an array
        } else {
          setEmployees([]); // ✅ fallback
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [employee]);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            {/* <div className="contact-title">
              <h2>Employees</h2>
              <button>Add Employee</button>
            </div> */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Active</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(employees) ? employees.map((emp) => (
                  <tr key={emp.employee_id}>
                    <td>{emp.active_employee ? "Yes" : "No"}</td>
                    <td>{emp.employee_first_name}</td>
                    <td>{emp.employee_last_name}</td>
                    <td>{emp.employee_email}</td>
                    <td>{emp.employee_phone}</td>
                    <td>{emp.added_date}</td>
                    {/* <td>
                        {employee.added_date && !isNaN(new Date(employee.added_date)) ? (
                            format(new Date(employee.added_date), 'dd/MM/yyyy | HH:mm')
                        ) : (
                            "N/A"
                        )}
                    </td> */}
                    <td>{emp.company_role_name}</td>
                    <td><div>edit | delete</div></td>
                  </tr>
                )) : (
                  <tr><td colSpan="8">No data</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
}

export default EmployeesList;
