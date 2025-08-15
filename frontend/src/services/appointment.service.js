const api_url = import.meta.env.VITE_API_URL;

const createAppointment = async (formData) =>{
    const requestOptions ={
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/appointment`,requestOptions);
    return response;
}
const getAllAppointment = async () => {
    const requestOptions = {
        method:'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(`${api_url}/api/appointments`,requestOptions);
    return response;
}
const updateAppointment = async (formData) => {
    const requestOptions ={
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/appointment/update`,requestOptions);
    return response;
}
export const appointmentService ={
    createAppointment,
    getAllAppointment,
    updateAppointment
}
export default appointmentService;