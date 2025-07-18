// import the query function from the db.config.js file
const conn = require('../config/db.config.js');
// import the bcrypt module
const bcrypt = require('bcrypt');
//import the employee service to get employee by email
const employeeService = require('../services/employee.service');
// handle employee login
async function login(employeeData) {
    try {
        let returnedData = {};// object to be returned to the client
        const employee = await employeeService.getEmployeeByEmail(employeeData.employee_email);
        if (employee.length === 0) {
            returnedData = {
                status: "fail",
                message: "Employee not found",
            };
            return returnedData;
        }
        
        const passwordMatch = await bcrypt.compare(employeeData.employee_password, employee[0].employee_password_hashed);
        if (!passwordMatch) {
            returnedData = {
                status: "fail",
                message: "Invalid password",
            };
            return returnedData;
        }
        returnedData = {
            status: "success",
            message: "Login successful",
            data: employee[0],
        };
        return returnedData;
    } catch (error) {
        console.error("Error in login service:", error);
    }
}
// export the login function
module.exports = {
    login
};