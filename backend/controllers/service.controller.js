const serviceServices = require("../services/service.service");
async function createService(req, res, next) {
    try {
        const serviceData = req.body;
        const service = await serviceServices.createServices(serviceData);

        if (!service) {
            res.status(400).json({
                error: "Failed to add the Service!",
            });
        } else {
            res.status(200).json({
                status: "Service added successfully",
                data: service,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: "Something went wrong!",
        });
    }
}
async function getAllServices(req, res, next) {
    const services = await serviceServices.getAllServices();
    if (!services) {
        res.status(400).json({
            error: "Faild To get All Services",
        });
    } else {
        res.status(200).json({
            status: "success",
            data: services,
        });
    }
}
async function updateService(req, res, next) {
    try {
    const updateService = await serviceServices.updateService(req.body);
    const rows = updateService.rows1.affectedRows;
    if (!updateService) {
        res.status(400).json({
            error: "Failed to update the service! not found",
        });
    } else if (rows === 1) {
        res.status(200).json({
            status: "Service Successful Updated!",
        });
    } else {
        res.status(400).json({
            status: "Update Incomplete!",
        });
    }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: "Something went wrong!",
        });
    }
}
async function deleteService(req, res, next) {
  try {
    const result = await serviceServices.deleteService(req.body);

    if (!result || !result.rows1 || !result.rows2) {
      return res.status(400).json({ error: "Failed to delete the Service! Not found or error occurred." });
    }

    const { rows1, rows2 } = result;

    if (rows1.affectedRows === 1 && rows2.affectedRows >= 0) {
      return res.status(200).json({ status: "Service successfully deleted!" });
    } else {
      return res.status(400).json({ status: "Delete incomplete!" });
    }
  } catch (error) {
    console.error("Delete Service Controller Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
    createService,
    getAllServices,
    updateService,
    deleteService
};