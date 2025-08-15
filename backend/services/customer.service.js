// import the query function from the db.config.js file
const conn = require('../config/db.config.js');
const {pool} = require('../config/db.config.js');
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
    console.log(customer);
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
//create function to get all customers
async function getAllCustomres() {
    const query = `SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id ORDER BY customer_identifier.customer_id DESC limit 10`;
    const rows = await conn.query(query);
    return rows;
}
async function getCustomerIdByEmail(email) {
    const query = "SELECT *FROM customer_identifier WHERE customer_id = ?";
    const rows = await conn.query(query,[email]);
    if (rows.length === 0) {
    throw new Error('Customer not found');
    }
return rows[0].customer_id;
}
async function getCustomerName() {
    const query = `SELECT customer_id, customer_first_name, customer_last_name FROM customer_info`;
    const rows = await conn.query(query);
    return rows;
}
async function updateCustomer(customer) {
    try {
        const customer_hash = customer.customer_hash;
        const query = "SELECT * FROM customer_identifier WHERE customer_hash = ?";

        const rows = await conn.query(query, [customer_hash]);

        const customer_id = rows[0].customer_id;
        const query1 = "UPDATE customer_identifier SET customer_email = ?, customer_phone_number = ? WHERE customer_id = ?";
        const query2 = "UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?";
        const rows1 = await conn.query(query1, [
            customer.customer_email,
            customer.customer_phone_number,
            customer_id
        ])
        const rows2 = await conn.query(query2,[
            customer.customer_first_name,
            customer.customer_last_name,
            customer.active_customer_status,
            customer_id
        ])
        return {rows1,rows2};
    } catch (error) {
        console.log(error);
    }
}
async function deleteCustomer(customer) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [rows] = await connection.query(
            "SELECT customer_id FROM customer_identifier WHERE customer_hash = ?",
            [customer.customer_hash]
        );

        if (rows.length === 0) {
            throw new Error("Customer not found");
        }

        const customer_id = rows[0].customer_id;

        const [rows1] = await connection.query(
            "DELETE FROM customer_info WHERE customer_id = ?",
            [customer_id]
        );

        const [rows2] = await connection.query(
            "DELETE FROM customer_identifier WHERE customer_id = ?",
            [customer_id]
        );

        await connection.commit();

        return { rows1, rows2 };

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}
async function getTotalCustomers() {
    try {
        const query = "SELECT COUNT(*) as count FROM customer_identifier";
        const rows = await conn.query(query);
        return rows[0].count;
        
    } catch (error) {
        console.log("Something Went Wrong", error);
    }
}
// export the checkIfCustomerExists function
module.exports = { 
    checkIfCustomerExists,
    createCustomer,
    getAllCustomres,
    getCustomerIdByEmail,
    getCustomerName,
    updateCustomer,
    deleteCustomer,
    getTotalCustomers,
    };