import React,{useState,useEffect} from 'react'
import AddCustomerForm from '../../components/Admin/AddCustomerForm/AddCustomerForm'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import CustomersList from '../../components/Admin/CustomersList/CustomersList'
import AddCustomerModal from '../../ModalComponent/AddCustomerModal';
import { useAuth } from '../../../Context/AuthContext';
import customerService from '../../../services/customer.service';

function Customers() {
  const { isLogged, isAdmin, token } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

   const fetchCustomers = async () => {
    try {
      const res = await customerService.getCustomers(token);
      if (!res.ok) {
        setApiError(true);
        if (res.status === 401) setApiErrorMessage('Please Login again');
        else if (res.status === 403) setApiErrorMessage('Not authorized');
        else setApiErrorMessage('Something went wrong');
        throw new Error('API error');
      }
      const data = await res.json();
      setCustomers(data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCustomerSaved = async () => {
    await fetchCustomers();
    setShowAddModal(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-2 admin-left-side">
                <AdminMenu />
              </div>

              <div className="col-md-9 admin-right-side">
                 <div className="d-flex justify-content-between align-items-center mb-3">
                  <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
                    + Add Customer
                  </button>
                </div>
                <CustomersList customer={customers}/>
                <AddCustomerModal
                  show={showAddModal}
                  handleClose={() => setShowAddModal(false)}
                  customerData={selectedCustomer}
                  onCustomerSaved={handleCustomerSaved} 
                />
              </div>
            </div>
          </div>
    </div>
  )
}

export default Customers
