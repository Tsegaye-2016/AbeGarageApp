// Function to read the data from local storage
const getAuth = async () => {
    const employee = await JSON.parse(localStorage.getItem('employee'));
    if(employee && employee.employeetoken){
        const decodedToken = await decodeTokenPayload(employee.employeetoken);
        employee.employee_role = decodedToken.employee_role;
        employee.employee_id = decodedToken.employee_id;
        employee.employee_first_name = decodedToken.employee_first_name;
        employee.employee_last_name = decodedToken.employee_last_name;
        employee.employee_email = decodedToken.employee_email;
        employee.employee_phone = decodedToken.employee_phone;
        

        return employee;
    }else{
        return {};
    }

};
// Function to decode the payload from the token
const decodeTokenPayload = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
    return JSON.parse(jsonPayload);
}

export default getAuth;