const conn = require('../config/db.config.js');
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

module.exports = {
    createServices,
    getAllServices
}