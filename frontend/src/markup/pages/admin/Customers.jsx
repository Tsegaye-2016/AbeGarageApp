import React,{useState} from 'react'
import AddCustomerForm from '../../components/Admin/AddCustomerForm/AddCustomerForm'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import CustomersList from '../../components/Admin/CustomersList/CustomersList'
import AddCustomerModal from '../../ModalComponent/AddCustomerModal';
import { useAuth } from '../../../Context/AuthContext';

function Customers() {
  const { isLogged, isAdmin } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>

              <div className="col-md-9 admin-right-side">
                 <div className="d-flex justify-content-between align-items-center mb-3">
                  <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
                    + Add Customer
                  </button>
                </div>
                <CustomersList />
                <AddCustomerModal
                  show={showAddModal}
                  handleClose={() => setShowAddModal(false)}
                />
              </div>
            </div>
          </div>
    </div>
  )
}

export default Customers
