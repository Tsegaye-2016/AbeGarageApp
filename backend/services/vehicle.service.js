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
async function updateVehicle(vehicles) {
  try {
    const vehicle = vehicles.vehicle_id;
    const query = "SELECT *FROM customer_vehicle_info WHERE vehicle_id = ?";
    const rows = await conn.query(query, [vehicle]);
    const vehicle_id = rows[0].vehicle_id;
    const query1 = "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ?";
    const rows1 = await conn.query(query1,[
        vehicles.vehicle_year,
        vehicles.vehicle_make,
        vehicles.vehicle_model,
        vehicles.vehicle_type,
        vehicles.vehicle_mileage,
        vehicles.vehicle_tag,
        vehicles.vehicle_serial,
        vehicles.vehicle_color,
        vehicle_id
    ]);
    return {rows1};
  } catch (error) {
    console.log("Something went wrong",error);
  }
}
async function countVehicle() {
    try {
      const query = "SELECT COUNT(*) as count FROM customer_vehicle_info";
      const rows = await conn.query(query);
      return rows[0].count;
    } catch (error) {
      console.log("Something went wrong",error);
    }
}
module.exports = {
    addVehicles,
    getVehiclesByCustomerId,
    getVehicleSerial,
    updateVehicle,
    countVehicle
};
