import React,{useState} from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import { useAuth } from '../../../Context/AuthContext';
import VehicleList from '../../components/Admin/VehicleList/VehicleList'
import AddVehicleModal from '../../ModalComponent/AddVehicleModal';
function Vehicles() {
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
                    + Add Vehicle
                  </button>
                </div>
                <VehicleList />
                <AddVehicleModal
                  show={showAddModal}
                  handleClose={() => setShowAddModal(false)}
                />
              </div>
              {/* <div className="col-md-9 admin-right-side">
                <CustomersList />
                <AddCustomerModal
                  show={showAddModal}
                  handleClose={() => setShowAddModal(false)}
                />
              </div> */}
            </div>
          </div>
    </div>
  )
}

export default Vehicles
