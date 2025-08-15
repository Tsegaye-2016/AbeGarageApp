const vehicleService = require('../services/vehicle.service');
async function addVehicles(req, res, next) {
    try {
        const vehiceData = req.body;

        // if (!vehiceData.customer_email) {
        //     return res.status(400).json({
        //         error: "customer_email is required"
        //     });
        // }

        const vehicle = await vehicleService.addVehicles(vehiceData);

        if (!vehicle) {
            return res.status(400).json({
                error: "Failed to add vehicle"
            });
        }

        res.status(200).json({
            status: "true",
            data: vehicle,
        });

    } catch (error) {
        console.error('Controller Error:', error);

        if (error.message === 'Customer not found') {
            return res.status(404).json({
                status: "false",
                error: "Customer not found"
            });
        }

        res.status(500).json({
            status: "false",
            error: "Internal server error"
        });
    }
}
async function getVehiclesByCustomerId(req, res) {
  const { customer_id } = req.params;
  try {
    const vehicles = await vehicleService.getVehiclesByCustomerId(customer_id);
    res.status(200).json({ data: vehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function getVehicleSerial(req, res) {
    const vehicleSerial = await vehicleService.getVehicleSerial();
    if (!vehicleSerial) {
        res.status(400).json({
            error: "Fail to get vehicle serial!"
        });
    } else {
        res.status(200).json({
            status: "success",
            data: vehicleSerial
        });
    }
}
async function updateVehicle(req, res, next) {
    try {
        const updateVehicle = await vehicleService.updateVehicle(req.body);
        const rows = updateVehicle.rows1.affectedRows;
        if (!updateVehicle) {
            res.status(400).json({
                error: "Failed to update the vehicle! not found",
            });
        } else if (rows === 1) {
            res.status(200).json({
                status: "Vehicle Successful Updated!",
            });
        } else {
            res.status(400).json({
                status: "Update Incomplete!",
            });
        }
    } catch (error) {
        console.log(error);
    }
    
}
async function countVehicle(req, res, next) {
    try {
        const countVehicle = await vehicleService.countVehicle();
        if(!countVehicle) {
            res.status(400).json({
                error: "Fail to get vehicle serial!"
            });
        } else {
            res.status(200).json({
                status: "success",
                data: countVehicle
            });
        }
    } catch (error) {
        console.log(error);
    }
    
}                   
module.exports = {
    addVehicles,
    getVehiclesByCustomerId,
    getVehicleSerial,
    updateVehicle,
    countVehicle
};
