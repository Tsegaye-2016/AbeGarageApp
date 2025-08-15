import React, { useState } from 'react';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import OrderList from '../../components/Admin/OrderList/OrderList';
import AddOrderModal from '../../ModalComponent/AddOrderModal';
function Orders() {
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    // <div>
    //   <div className="container-fluid admin-pages">
    //         <div className="row">
    //           <div className="col-md-3 admin-left-side">
    //             <AdminMenu />
    //           </div>

    //           <div className="col-md-9 admin-right-side">
    //              <div className="d-flex justify-content-between align-items-center mb-3">
    //               <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
    //                 + Add Order
    //               </button>
    //             </div>
    //             <OrderList />
    //             <AddOrderModal
    //               show={showAddModal}
    //               handleClose={() => setShowAddModal(false)}
    //             />
    //           </div>
    //         </div>
    //       </div>
    // </div>
    <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-2 admin-left-side">
                <AdminMenu />
              </div>

              <div className="col-md-9 admin-right-side">
                 <div className="d-flex justify-content-between align-items-center mb-3">
                  <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
                    + Add Order
                  </button>
                </div>
                <OrderList />
                <AddOrderModal
                  show={showAddModal}
                  handleClose={() => setShowAddModal(false)}
                />
              </div>
            </div>
          </div>
    </div>
  )
}

export default Orders
