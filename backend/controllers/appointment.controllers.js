const appointmentService = require('../services/appointment.service');

async function createAppointment(req,res,next) {
        try {
            const appointData = req.body;
            const appoint = await appointmentService.createAppointment(appointData);

            if(!appoint){
                res.status(400).json({
                    error:"Fail to Add Appointment"
                })
            }else{
                res.status(200).json({
                    status:"Appointment Successfully Created",
                    data:appoint
                })
            }
            
        } catch (error) {
            console.log(error);
            res.status(404).json({
                error: "Something went wrong!",
            });
        }    
}
async function getAllAppointment(req, res, next) {
        const appointment = await appointmentService.getAllAppointment();
        if(!appointment){
            res.status(400).json({
                error:"Fail to get Appointment"
            })
        }else{
            res.status(200).json({
                status:"success",
                data:appointment
            })
        }
}
async function updateAppointment(req, res, next) {
    try {
        const updateAppoint = await appointmentService.updateAppointment(req.body);
        const rows = updateAppoint.rows1.affectedRows;
        if (!updateAppoint) {
            res.status(400).json({
                error: "Failed to update the appointment! not found",
            });
        } else if (rows === 1) {
            res.status(200).json({
                status: "Appointment Successful Updated!",
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
module.exports ={
    createAppointment,
    getAllAppointment,
    updateAppointment
}