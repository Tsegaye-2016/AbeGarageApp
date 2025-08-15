//import the employee service
const employeeService = require('../services/employee.service'); 
//create the add employee controller
async function createEmployee(req,res, next) {
    // console.log(req.headers);
    //check if employee email is already exist in the database
    const employeeExists = await employeeService.checkIfEmployeeExists(req.body.employee_email);
    //if employee email is already exist in the database, send an error message to the client
    if(employeeExists){
        res.status(400).json({
            error: "Employee email already exist"
        });
    } else {
        try {
            const employeeData = req.body;
            //create the employee in the database
            const employee = await employeeService.createEmployee(employeeData);
            //if employee is created successfully, send a success message to the client
            if(!employee){
                res.status(400).json({
                    error: "Failed to create employee"
                });
            }else{
                res.status(200).json({
                    status: "true",
                    data:employee,
                });
            }

        }catch(error){
            console.log(error);
            res.status(400).json({
                error: "Something went wrong"
            });
        }
    }
}
async function getAllEmployees(req, res, next) {
        //get all employees from the database
        const employees = await employeeService.getAllEmployees();
        //if employees are found, send them to the client
        if (!employees) {
            res.status(400).json({
                error: "Fail to get employees!"
            });
        } else {
            res.status(200).json({
                status: "success",
                data: employees
            });
        }
}
async function getEmployeeName(req,res,next) {
    const employeeName = await employeeService.getEmployeeName();
    if (!employeeName) {
        res.status(400).json({
            error: "Fail to get employees!"
        });
    } else {
        res.status(200).json({
            status: "success",
            data: employeeName
        });
    }
    
}
async function updateEmployee(req, res, next) {
    try {
        const updateEmployee = await employeeService.updateEmployee(req.body);
        const rows1 = updateEmployee.rows1.affectedRows;
        const rows2 = updateEmployee.rows2.affectedRows;
        const rows3 = updateEmployee.rows3.affectedRows;
        if (!updateEmployee) {
            res.status(400).json({
                error: "Failed to update the employee! not found",
            });
        }else if (rows1 === 1 && rows2 === 1 && rows3 === 1) {
            res.status(200).json({
                status: "Customer Successful Updated!",
            });
        }
        else {
            res.status(400).json({
                status: "Update Incomplete!",
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "Something went wrong!",
        });
    }
}
async function getTotalEmployee(req, res, next) {
        try {
            const totalEmployee = await employeeService.getTotalEmployee();
            if(!totalEmployee){
                res.status(400).json({
                    error:"Employee Not Fetched"
                })
            }else{
                res.status(200).json({
                    status:"Success",
                    data:totalEmployee
                })
            }
        } catch (error) {
            console.log("Something Went Wrong" ,error);
        }
}
//export the add employee controller
module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeName,
    updateEmployee,
    getTotalEmployee,
}