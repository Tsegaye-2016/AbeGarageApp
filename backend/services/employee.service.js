//import the query function from the db.config.js file
const conn = require('../config/db.config.js');
//import the bcrypt module
const bcrypt = require('bcrypt');
//create a function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
    const query = "SELECT *FROM employee WHERE employee_email = ?";
    const rows = await conn.query(query,[email]);
    console.log(rows);
    if(rows.length > 0){
        return true;
    }
        
    return false;
}

// create a function to create new employee
async function createEmployee(employee) {
    let createdEmployee = {};
    try{
        //generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
        //insert the email in to the employee table
        const query = "INSERT INTO employee (employee_email, active_employee) VALUES (?,?)";
        const rows = await conn.query(query,[employee.employee_email, employee.active_employee]);
        console.log(rows);
        if(rows.affectedRows !==1){
            return false;
        }
        //get the employee id from the insert
        const employee_id = rows.insertId;
        // insert the remaining data in to the employee_info,employee_pass and employee_role table 
        const query2 = "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?,?,?,?)";
        const rows2 = await conn.query(query2,[employee_id, employee.employee_first_name, employee.employee_last_name, employee.employee_phone]);
        
        const query3 = "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?,?)";
        const rows3 = await conn.query(query3,[employee_id, hashedPassword]);
        
        const query4 = "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?,?)";
        const rows4 = await conn.query(query4,[employee_id, employee.company_role_id]);

        //construct to the employee object
        createdEmployee = {
            employee_id: employee_id,
            // employee_email: employee.employee_email,
            // active_employee: employee.active_employee,
            // employee_first_name: employee.employee_first_name,
            // employee_last_name: employee.employee_last_name,
            // employee_phone: employee.employee_phone,
        }
    }catch(err){
        console.log(err);
    }
    //return the employee object
    return createdEmployee;
}
// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
    const query = `SELECT *FROM employee INNER JOIN employee_info ON employee.employee_id = 
    employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.
    employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee_email = ?`;
    const rows = await conn.query(query,[employee_email]);
    return rows;
}

// A function to get all employees
async function getAllEmployees() {
  const query = `SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = 
  employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id 
  INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 100`;
  const rows = await conn.query(query);
  return rows;
}
async function getEmployeeName() {
    const query = `SELECT employee_id, employee_first_name, employee_last_name FROM employee_info`;
    const rows = await conn.query(query);
    return rows;
    
}
//export the function for use in the controller
module.exports = {
    checkIfEmployeeExists,
    createEmployee,
    getEmployeeByEmail,
    getAllEmployees,
    getEmployeeName
}