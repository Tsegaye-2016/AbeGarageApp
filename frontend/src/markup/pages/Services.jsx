import React,{useState,useEffect} from 'react'
import {useAuth} from '../../Context/AuthContext';
import serviceService from '../../services/service.service';
import AddServiceModal from '../ModalComponent/AddServiceModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  TableCell,
  IconButton,Box
} from '@mui/material';
import { set } from 'date-fns';
function Services() {
    const [services, setServices] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const {employee} = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [hoveredServiceId, setHoveredServiceId] = useState(null);
    const [selectedService, setSelectedService] = useState(null);

    const fetchServices = async () => {
      const token = employee?.employeetoken;
            serviceService.getAllServices(token)
            .then((res)=>{
              if(!res.ok){
                setApiError(true);
                if(res.status === 401){
                  setApiErrorMessage('Please Login again to Continue');
                }else if(res.status === 403){
                  setApiErrorMessage('You are not authorized to view this page')
                }else{
                setApiErrorMessage('Something went wrong, please try again later');
                }
              throw new Error('API error');
              }
              return res.json();
            })
          .then((data) => {
            setServices(data?.data || []);
          })
          .catch((err) => {
            console.error('Fetch error:', err);
          });
    }
    const handleEdit = (service) => {
      setSelectedService(service);
      setShowModal(true);
    }
    const handleDelete = async (service_id) => {
      const confirmed = window.confirm('Are you sure you want to delete this Service')
      if(!confirmed) return;
      const formData = { service_id };
      const response = await serviceService.deleteService(formData, employee?.employeetoken);
      if(response.ok){
        setServices(prev => prev.filter(service => service.service_id !== service_id));
        alert('Service deleted successfully');
      }else{
        const result = await response.json();
        alert('Failed to delete Service: ' + (result.error || 'Unknown error'));
      }
    }
    const handleServiceOnSaved = async () => {
      await fetchServices();
      setShowModal(false);
    };
    useEffect(()=>{
            fetchServices();
        },[employee])

  return (
  <Box>
 <div className="p-4">
      {/* Add Service Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Add Service
        </button>

        <AddServiceModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          serviceData = {selectedService}
          onServiceSaved={handleServiceOnSaved}
        />
      </div>

      {/* Service Cards */}
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.service_id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 relative"
              onMouseEnter={() => setHoveredServiceId(service.service_id)}
              onMouseLeave={() => setHoveredServiceId(null)}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.service_name}
                </h3>
                <p className="text-gray-600">{service.service_description}</p>

                {hoveredServiceId === service.service_id && (
                  <div className="absolute top-2 right-2">
                    <div align="center" className="p-0 bg-white rounded-lg shadow">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(service)}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(service.service_id)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No services found.</p>
      )}
    </div>
</Box>
  );
}

export default Services
