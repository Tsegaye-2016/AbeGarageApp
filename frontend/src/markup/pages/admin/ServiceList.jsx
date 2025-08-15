import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import Services from '../Services'
function ServiceList() {
  return (
    <div>
      <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-2 admin-left-side">
                <AdminMenu />
              </div>

              <div className="col-md-9 admin-right-side">
                 <div className="d-flex justify-content-between align-items-center mb-3">
                </div>
                <Services />
              </div>
            </div>
          </div>
    </div>
  )
}

export default ServiceList
