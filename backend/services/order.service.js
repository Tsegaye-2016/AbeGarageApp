const conn = require('../config/db.config');
const crypto = require('crypto');
async function createOrder(order) {
    try{
        const hash_id = crypto.randomUUID();
        const queryOrder = "INSERT INTO orders(employee_id,customer_id,vehicle_id,order_date,active_order,order_hash) VALUES(?,?,?,CURRENT_TIMESTAMP,1,?)";
        console.log("Inserting into orders...");
        const rows = await conn.query(queryOrder, [
            order.employee_id,
            order.customer_id,
            order.vehicle_id,
            hash_id
        ]);
        console.log("Inserted into orders:", rows);
        if(rows.affectedRows !== 1){
        console.log("Order insert failed");
            return false;
        }

        const order_id = rows.insertId;
        console.log("Order ID:", order_id);
        const queryOrderInfo = "INSERT INTO order_info(order_id,order_total_price,completion_date,additional_request,notes_for_internal_use,notes_for_customer,additional_requests_completed) VALUES(?,?,?,?,?,?,0)";

        const rows2 = await conn.query(queryOrderInfo,[
            order_id,
            order.order_total_price,
            order.estimated_completion_date,
            order.completion_date,  
            order.additional_request,
            order.notes_for_internal_use,
            order.notes_for_customer
        ]);

        if(rows2.affectedRows !== 1){
        console.log("Order info insert failed");
            return false;
        }

        const queryOrderServices = "INSERT INTO order_services(order_id,service_id,service_completed) VALUES(?,?,?)";
        let affectedRowss = 0;

        for(let i = 0; i < order.order_services.length; i++){
            const values = [order_id,order.order_services[i],0];
            const rows3 = await conn.query(queryOrderServices,values);
            affectedRowss = rows3.affectedRows + affectedRowss;
        }

        if(affectedRowss < 1){
        console.log("No order services inserted");
            return false;
        }

        const queryOrderStatus = "INSERT INTO order_status(order_id,order_status) VALUES(?,?)";
        const rows3 = await conn.query(queryOrderStatus,[order_id,0]);

        if(rows3.affectedRows !== 1){
        console.log("Order status insert failed");
            return false;
        }

        return {
        order_id,
        order_hash: hash_id
        };

    }catch(error){
        console.error("Error in createOrder:", error.message);
        throw error;
    }
}
async function getAllOrders() {
  try {
    const orders = await conn.query(`
      SELECT o.*, oi.order_total_price, oi.estimated_completion_date, 
             oi.completion_date, oi.additional_request, oi.notes_for_internal_use,
             oi.notes_for_customer, oi.additional_requests_completed,
             os.order_status
      FROM orders o
      INNER JOIN order_info oi ON o.order_id = oi.order_id
      INNER JOIN order_status os ON o.order_id = os.order_id
      ORDER BY o.order_id DESC
      LIMIT 100;
    `);

    const services = await conn.query(`
      SELECT order_id, service_id, service_completed 
      FROM order_services;
    `);

    const serviceMap = services.reduce((acc, s) => {
      if (!acc[s.order_id]) acc[s.order_id] = [];
      acc[s.order_id].push({
        service_id: s.service_id,
        service_completed: s.service_completed
      });
      return acc;
    }, {});

    const mergedOrders = orders.map(order => ({
      ...order,
      services: serviceMap[order.order_id] || []
    }));

    return mergedOrders;

  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}


module.exports = {
    createOrder,
    getAllOrders
}