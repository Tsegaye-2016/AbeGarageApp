//import the login service
const loginService = require('../services/login.service');
//import the jsonwebtoken module
const jwt = require('jsonwebtoken');
//import the jwt secret key from the environment variable
const jwtSecret = process.env.JWT_SECRET;
//handle employee login
async function login(req, res,next) {
    try {
        console.log(req.body);
        const employeeData = req.body;
        // call the login method from the login service
        const employee = await loginService.login(employeeData);
        // if the employee is not found, return a 404 status code
        if (employee.status === "fail") {
            return res.status(404).json({
                status: employee.status,
                message: employee.message
            });
            console.log(employee.message);
        }
        // if the employee is found, create a JWT token
        const payload = {
            employee_id: employee.data.employee_id,
            employee_email: employee.data.employee_email,
            employee_role: employee.data.company_role_id,
            employee_first_name: employee.data.employee_first_name,
            employee_last_name: employee.data.employee_last_name,
            employee_phone: employee.data.employee_phone,
        }
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        // console.log("Token generated:", token);
        // return the token and employee data to the client
        const sentBack = {
            // status: "success",
            // message: "Login successful",
            // data: employee.data,
            employeetoken: token
        }
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: sentBack
        });

    } catch (error) {
        
    }
}
//export the login controller
module.exports = {
    login
}