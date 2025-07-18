const api_url = import.meta.env.VITE_API_URL;

const createServices = async (formData,loggedInEmployeeToken) => {
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token':loggedInEmployeeToken},
        body: JSON.stringify(formData)
    }
    const response = await fetch(`${api_url}/api/service`, requestOptions);
    return response;
}
const getAllServices = async(token) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    };
    const response = await fetch(`${api_url}/api/services`, requestOptions);
    return response;
}

export const serviceService = {
    createServices,
    getAllServices
}
export default serviceService;