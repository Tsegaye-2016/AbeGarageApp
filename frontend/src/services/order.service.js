const api_url = import.meta.env.VITE_API_URL;

const createOrders = async (formData,loggedInEmployeeToken) => {
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token':loggedInEmployeeToken},
        body: JSON.stringify(formData)
    }
    const response = await fetch(`${api_url}/api/order`, requestOptions);
    return response;
}
const getAllOrders = async(token) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    };
    const response = await fetch(`${api_url}/api/orders`, requestOptions);
    return response;
}
const getTotalOrders = async() => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(`${api_url}/api/orders/total_orders`, requestOptions);
    return response;
}
export const orderService = {
    createOrders,
    getAllOrders,
    getTotalOrders
}
export default orderService