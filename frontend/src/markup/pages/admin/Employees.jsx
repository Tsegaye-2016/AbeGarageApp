import React,{ useState} from 'react'
import { useAuth } from '../../../Context/AuthContext';
import LoginForm from '../../components/LoginForm/LoginForm';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EmployeesList from '../../components/Admin/EmployeesList/EmployeesList';
import AddEmployeeModal from '../../ModalComponent/AddEmployeeModal';
function Employees() {
  const { isLogged, isAdmin } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  // console.log("logged",isLogged);
  // console.log("admin",isAdmin);
  if (isLogged){
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
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
