// // import the api url from the env
// const api_url = import.meta.env.VITE_API_URL;

// // a function to send post request to the backend to create a new employee
// const createEmployee = async (formData) => {
//     const requestOptions ={
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//     };
//     const response = await fetch(`${api_url}/api/employee`, requestOptions);
//     return response;
// }
// //Export the createEmployee function
// export const employeeService = {
//     createEmployee
// };
// export default employeeService;



// the second updatedcode to include the token in the request headers
// import the api url from the env
const api_url = import.meta.env.VITE_API_URL;

// a function to send post request to the backend to create a new employee
const createEmployee = async (formData,loggedInToken) => {
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token':loggedInToken},
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/employee`, requestOptions);
    return response;
}

const getAllEmployees = async(token) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    };
    const response = await fetch(`${api_url}/api/employees`, requestOptions);
    return response;
}
const getEmployeeName = async(token) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    };
    const response = await fetch(`${api_url}/api/employeess`, requestOptions);
    return response;
}
//Export the createEmployee function
export const employeeService = {
    createEmployee,
    getAllEmployees,
    getEmployeeName,
};
export default employeeService;