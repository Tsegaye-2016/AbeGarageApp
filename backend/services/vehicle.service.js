const conn = require('../config/db.config');
const customerService = require('../services/customer.service');
async function addVehicles(vehicle) {
  try {
    if (!vehicle.customer_id) {
      throw new Error('customer_id is required');
    }

    const vehicleQuery = `
      INSERT INTO customer_vehicle_info (
        customer_id,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await conn.query(vehicleQuery, [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color
    ]);

    if (result.affectedRows !== 1) {
      return false;
    }

    return { vehicle_id: result.insertId };

  } catch (error) {
    console.error('Error in addVehicles:', error.message);
    throw error;
  }
}
async function getVehiclesByCustomerId(customer_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
  const rows = await conn.query(query, [customer_id]);
  return rows;
}
async function getVehicleSerial() {
  const query = "SELECT vehicle_id, vehicle_model FROM customer_vehicle_info";
  const rows = await conn.query(query);
  return rows;
  
}
module.exports = {
    addVehicles,
    getVehiclesByCustomerId,
    getVehicleSerial
};
