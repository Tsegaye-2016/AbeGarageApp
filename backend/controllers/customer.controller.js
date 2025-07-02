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
//export the createCustomer function
module.exports = {
    createCustomer
}