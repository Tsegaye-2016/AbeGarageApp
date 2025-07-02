const api_url = import.meta.env.VITE_API_URL;
// A function to send the login request to the backend
const loginEmployee = async (formData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    console.log('About to send request to:', `${api_url}/api/employee/login`);
    console.log('Request options:', requestOptions.body);
    const response = await fetch(`${api_url}/api/employee/login`, requestOptions);
    return response;
}
//Afunction to log out the employee
const logoutEmployee = () => {
    localStorage.removeItem('employee');
}
// Export the login function
export const loginService = {
  loginEmployee,
  logoutEmployee
};

export default loginService;
