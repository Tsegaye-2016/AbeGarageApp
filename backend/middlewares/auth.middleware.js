//import the employee service
const employeeService = require('../services/employee.service');
//import dotenv package
require('dotenv').config();
//import the jwt package
const jwt = require('jsonwebtoken');
// A Function to verify the JWT token received from the client/frontend
const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ 
            status:"fail",
            message: 'No token provided!' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ 
                status:"fail",
                message: 'Unauthorized!' });
        }
        // If the token is valid, save the decoded information to the request for use in other routes
        req.employee_email = decoded.employee_email;
        next();
    });
};

// A function to check if the user is an admin
const isAdmin = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    // console.log(req.employee_email);
    const employee_email = req.employee_email;
    const employee = await employeeService.getEmployeeByEmail(employee_email);
    if (employee[0].company_role_id === 3) { // Assuming 3 is the admin role ID
        next();
        console.log("Employe created successfully");
    } else {
        // console.log("you are Not an Admin");
        return res.status(403).send({ 
            status:"fail",
            message: 'Not an Admin' });
    }
}
const authMiddleware = {
    verifyToken,
    isAdmin
};
module.exports = authMiddleware;