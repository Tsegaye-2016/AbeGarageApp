const api_url = import.meta.env.VITE_API_URL;

const createVehicle = async (formData,loggedInEmployeeToken) => {
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token':loggedInEmployeeToken},
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/vehicel`, requestOptions);
    return response;
}
const getVehicles = async(customer_id,token) => {
    const requestOptions = {
        method:'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    }
    const response = await fetch(`${api_url}/api/customers/${customer_id}`,requestOptions);
    return response;
}
const getVehicleSerial = async(token) =>{
        const requestOptions = {
            method:'GET',
            headers:{'content-Type':'application/json','x-access-token':token}
        }
        const response = await fetch(`${api_url}/api/vehicle_serial`,requestOptions);
        return response;
}
export const vehicleService = {
    createVehicle,
    getVehicles,
    getVehicleSerial
}
export default vehicleService;