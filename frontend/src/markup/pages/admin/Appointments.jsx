import React ,{useState, useEffect} from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import AppointmentList from '../../components/Admin/AppointmentList/AppointmentList';
import AddAppointmentModal from '../../ModalComponent/AddAppointmentModal';
import appointmentService from '../../../services/appointment.service';
function Appointments() {
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
   const fetchAppointments = async () => {
    console.log('Tsegaye Alamirew');
      try {
        const res = await appointmentService.getAllAppointment();
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) setApiErrorMessage('Please Login again');
          else if (res.status === 403) setApiErrorMessage('Not authorized');
          else setApiErrorMessage('Something went wrong');
          throw new Error('API error');
        }
        const data = await res.json();
        setAppointment(data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleAppointmentSaved = async () => {
      await fetchAppointments();
      setShowAddModal(false);
    };
  
    useEffect(() => {
      fetchAppointments();
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
                    + Add Appointment
                  </button>
                </div>
                <AppointmentList/>
                <AddAppointmentModal
                  show={showAddModal}
                  handleClose={() => setShowAddModal(false)}
                  customerData={selectedAppointment}
                  onAppointmentSaved={handleAppointmentSaved} 
                />
              </div>
            </div>
          </div>
    </div>
  )
}

export default Appointments
