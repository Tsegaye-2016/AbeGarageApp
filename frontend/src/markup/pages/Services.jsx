import React,{useState,useEffect} from 'react'
import {useAuth} from '../../Context/AuthContext';
import serviceService from '../../services/service.service';
import AddServiceModal from '../ModalComponent/AddServiceModal';
function Services() {
    const [services, setServices] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const {employee} = useAuth();

    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(()=>{
            const token = employee?.employeetoken;
            // console.log("tsegaye token",token);
            // if(!token){
            //     setApiError(true);
            //     setApiErrorMessage("Missing Token Please Login Again");
            //     return;
            // }
    
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
        },[employee])

  return (
  //   <div className="p-4">
  //     {services.length > 0 ? (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  //         {services.map((service) => (
  //           <div
  //             key={service.service_id}
  //             className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
  //           >
  //             <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.service_name}</h3>
  //             <p className="text-gray-600">{service.service_description}</p>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <p className="text-center text-gray-500">No services found.</p>
  //     )}

  //     <button></button>
  // </div>
<div className="p-4">
  {/* Add Service Button */}
  <div className="flex justify-end mb-6">
    <button
      //onClick={handleAddService} // Replace with your function
      onClick={() => setShowAddModal(true)}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      Add Service
    </button>

                <AddServiceModal
                  show={showAddModal}
                  handleClose={() => setShowAddModal(false)}
                />
  </div>

  {/* Service Cards */}
  {services.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service.service_id}
          className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.service_name}</h3>
          <p className="text-gray-600">{service.service_description}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">No services found.</p>
  )}
</div>

  )
}

export default Services
