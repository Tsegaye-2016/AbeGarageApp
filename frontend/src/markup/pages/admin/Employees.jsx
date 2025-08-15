import React,{ useState,useEffect} from 'react'
import { useAuth } from '../../../Context/AuthContext';
import LoginForm from '../../components/LoginForm/LoginForm';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EmployeesList from '../../components/Admin/EmployeesList/EmployeesList';
import AddEmployeeModal from '../../ModalComponent/AddEmployeeModal';
import employeeService from '../../../services/employee.service';
function Employees() {
  const { isLogged, isAdmin } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [employees, setEmployees] = useState([]);
  const { employee } = useAuth();
  // console.log("logged",isLogged);
  // console.log("admin",isAdmin);
  const fetchEmployees = async () => {
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
  }
  const handleEmployeeSaved = async () => {
    await fetchEmployees();
    setShowAddModal(false);
  }
  useEffect(() => {
    fetchEmployees();
  }, []);
  if (isLogged){
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-2 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                 <div className="d-flex justify-content-between align-items-center mb-3">
                  {/* <h2>Employee Management</h2> */}
                  <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
                    + Add Employee
                  </button>
                </div>
                <EmployeesList />
                <AddEmployeeModal
                  show={showAddModal}
                  handleClose={() => setShowAddModal(false)}
                  employeeData={selectedEmployee}
                  onEmployeeSaved={handleEmployeeSaved}
                />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Unauthorized Access</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      )
    }
  } else {
    return (
      <div>
        <h1>Please Login</h1>
        <LoginForm />
      </div>
    )
  }
}

export default Employees
