import { get } from "react-hook-form";

const api_url = import.meta.env.VITE_API_URL;
// Create a function to send post resquest to the backend to create new customer

const createCustomer = async (formData,loggedInEmployeeToken)=>{
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token':loggedInEmployeeToken},
        body: JSON.stringify(formData)
    };
    console.log("Tsegaye service formData",formData);
    const response = await fetch(`${api_url}/api/customer`, requestOptions);
    return response;
}
const getCustomers = async(token) => {
    const requestOptions = {
        method:'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    }
    const response = await fetch(`${api_url}/api/customers`,requestOptions);
    return response;
}
const getCustomerName = async(token) => {
    const requestOptions = {
        method:'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    }
    const response = await fetch(`${api_url}/api/customerss`,requestOptions);
    return response;
}
const updateCustomer = async (formData,loggedInEmployeeToken)=>{
    const requestOptions ={
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','x-access-token':loggedInEmployeeToken},
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/customer/update`, requestOptions);
    return response;
}
const deleteCustomer = async (formData,loggedInEmployeeToken)=>{
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token':loggedInEmployeeToken},
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/customer/delete`, requestOptions);
    return response;
}
const getTotalCustomers = async () => {
    const requestOptions ={
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    };
    const response = await fetch(`${api_url}/api/customer/total_customers`);
    return response;
}
export const customerService = {
    createCustomer,
    getCustomers,
    getCustomerName,
    updateCustomer,
    deleteCustomer,
    getTotalCustomers,
}
export default customerService;