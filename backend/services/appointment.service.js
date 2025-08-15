const conn = require('../config/db.config.js');
async function createAppointment(appointment) {
    try {
        const queryAppo = "INSERT INTO appointments (customer_id,vehicle_id,service_id,date,time_slot,employee_id,status,notes) VALUES(?,?,?,?,?,?,?,?)";
        const appointRows = await conn.query(
            queryAppo,
            [
                appointment.customer_id,
                appointment.vehicle_id,
                appointment.service_id,
                appointment.date,
                appointment.time_slot,
                appointment.employee_id,
                appointment.status,
                appointment.notes
            ]
        );
        if(appointRows.affectedRows !== 1){
            return false;
        }
        return true;
    } catch (error) {
        console.log("Something Went Wrong",error);
    }
}
async function getAllAppointment() {
    try {
        const query = "SELECT *FROM appointments";
        const result = await conn.query(query);
        return result;
    } catch (error) {
        console.error('Error in Appointment:', error.message);
        throw error;
    }
}
async function updateAppointment(appointment) {
    try {
        const appoint = appointment.id;
        const query = "SELECT *FROM appointments WHERE id = ?";
        const rows = await conn.query(query, [appoint]);

        const id = rows[0].id;
        const updateQuery = "UPDATE appointments SET customer_id = ?, vehicle_id = ?, service_id = ?, date = ?, time_slot = ?, employee_id = ?, status = ?, notes = ? WHERE id = ?";
        const rows1 = await conn.query(updateQuery, [
            appointment.customer_id,
            appointment.vehicle_id,
            appointment.service_id,
            appointment.date,
            appointment.time_slot,
            appointment.employee_id,
            appointment.status,
            appointment.notes,
            id
        ]);
        return {rows1};
        
    } catch (error) {
        console.log("Something went wrong",error);
    }
    
}
module.exports ={
    createAppointment,
    getAllAppointment,
    updateAppointment
}