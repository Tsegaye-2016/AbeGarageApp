//import customer service
const customerService = require('../services/customer.service');
//create a function to create a customer
async function createCustomer(req,res,next) {
    //check if customer email is already exist in the database
    const customerExists = await customerService.checkIfCustomerExists(req.body.customer_email);
    //if customer exists in the database send an error message to the client
    if(customerExists){
        res.status(400).json({
            error: "Customer already exists"
        });
    }else{
        try{
            const customerData = req.body;
            //create the customer in the database
            const customer = await customerService.createCustomer(customerData);
            console.log(customer);
            //if customer is created successfully, send a success message to the client
            if(!customer){
                res.status(400).json({
                    error: "Failed to create customer"
                });
            }else{
                res.status(200).json({
                    status: "true",
                    data:customer,
                });
            }
        }catch(error){

        }
    }
}
async function getAllCustomres(req,res, next) {
            const customers = await customerService.getAllCustomres();
            if(!customers){
                res.status(400).json({
                    error:"Faild To get All Customers"
                })
            }else{
                res.status(200).json({
                    status:"success",
                    data:customers
                })
            }
}
async function getCustomerName(req,res, next) {
    const customerName = await customerService.getCustomerName();
    if (!customerName) {
        res.status(400).json({
            error: "Fail to get customers!"
        });
    } else {
        res.status(200).json({
            status: "success",
            data: customerName
        });
    }
    
}
async function updateCustomer(req, res, next) {
    try {
        const updateCustomer = await customerService.updateCustomer(req.body);
        const rows1 = updateCustomer.rows1.affectedRows;
        const rows2 = updateCustomer.rows2.affectedRows;
        if (!updateCustomer) {
            res.status(400).json({
                error: "Failed to update the customer! not found",
            });
        } else if (rows1 === 1 && rows2 === 1) {
            res.status(200).json({
                status: "Customer Successful Updated!",
            });
        } else {
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
//export the createCustomer function
module.exports = {
    createCustomer,
    getAllCustomres,
    getCustomerName,
    updateCustomer
}