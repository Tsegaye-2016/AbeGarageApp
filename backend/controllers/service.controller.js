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

module.exports = {
    createService,
    getAllServices
};