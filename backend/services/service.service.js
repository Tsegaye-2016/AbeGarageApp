const conn = require('../config/db.config.js');
const {pool} = require('../config/db.config.js');
async function createServices(service) {
try {
    const serviceQuery = "INSERT INTO common_services(service_name,service_description) VALUES(?,?)";
    const result = await conn.query(serviceQuery, [
        service.service_name,
        service.service_description
    ]);
    if(result.affectedRows !== 1){
        return false;
    }
    return true;

} catch (error) {
    console.error('Error in common services:', error.message);
    throw error;
}
}

async function getAllServices() {
    try {
        const serviceQuery = "SELECT * FROM common_services";
        const result = await conn.query(serviceQuery);
        return result;
    } catch (error) {
        console.error('Error in common services:', error.message);
        throw error;
    }
    
}
async function updateService(services) {
    try {
        const service = services.service_id;
        const query = "SELECT *FROM common_services WHERE service_id = ?";
        const rows = await conn.query(query,[service]);
        const service_id = rows[0].service_id;
        const query1 = "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?";
        const rows1 = await conn.query(query1,[
            services.service_name,
            services.service_description,
            service_id
        ]);
        return {rows1};
    } catch (error) {
        console.log("Something went wrong",error);
    }
}
async function deleteService(service) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [rows] = await connection.query(
            "SELECT service_id FROM common_services WHERE service_id = ?",
            [service.service_id]
        );

        if (rows.length === 0) {
            throw new Error("Service not found");
        }
        if (rows.length === 0) {
            await connection.rollback(); // rollback before throwing
            return null; // return null instead of throwing — controller will handle
            }
        const service_id = rows[0].service_id;

        const [rows2] = await connection.query(
            "DELETE FROM order_services WHERE service_id = ?",
            [service_id]
        )
        const [rows1] = await connection.query(
            "DELETE FROM common_services WHERE service_id = ?",
            [service_id]
        );
        await connection.commit();

        return { rows1,rows2 };
    } catch (error) {
        await connection.rollback(); // rollback on any error
    console.error("Something went wrong in deleteService:", error);
    return null; // return null to avoid undefined destructuring
    }finally{
        connection.release();
    }
}
module.exports = {
    createServices,
    getAllServices,
    updateService,
    deleteService
}