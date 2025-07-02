// import the query function from the db.config.js file
const conn = require('../config/db.config.js');
// import the crypto module to generate random id
const crypto = require('crypto');
// create a function to check if customer email is already exist in the database
async function checkIfCustomerExists(email) {
    const query = "SELECT *FROM customer_identifier WHERE customer_email = ?";
    const rows = await conn.query(query,[email]);
    console.log(rows);
    if(rows.length > 0){
        return true;
    }
        
    return false;
}
//create a function to add new customer to the database
async function createCustomer(customer) {
    let createdCustomer = {};
    try{
        const hash_id = crypto.randomUUID();
        const queryCustomer = "INSERT INTO customer_identifier (customer_email,customer_phone_number,customer_hash) VALUES (?,?,?)";

        const customerRows = await conn.query(
            queryCustomer,
            [
                customer.customer_email,
                customer.customer_phone_number,
                hash_id
            ]
        );
        if(customerRows.affectedRows !== 1){
            return false;
        }
        const customer_id = customerRows.insertId;
        const queryCustomerInfo = "INSERT INTO customer_info (customer_id,customer_first_name,customer_last_name,active_customer_status) VALUES (?,?,?,?)";
        const customerInfoRows = await conn.query(
            queryCustomerInfo,
            [
                customer_id,
                customer.customer_first_name,
                customer.customer_last_name,
                customer.active_customer_status
            ]
        );
        createdCustomer = {
            customer_id: customer_id,
            // customer_email: customer.customer_email,
            // customer_phone: customer.customer_phone,
            // customer_first_name: customer.customer_first_name,
            // customer_last_name: customer.customer_last_name,
            // active_customer_status: customer.active_customer_status,
            // customer_hash: hash_id
        }

    }catch(error){
        console.log(error);
    }

    return createdCustomer;
}
// export the checkIfCustomerExists function
module.exports = { 
    checkIfCustomerExists,
    createCustomer
    };