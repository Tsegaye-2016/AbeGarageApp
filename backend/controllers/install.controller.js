//import the install service to handle communication with the database
const installService = require('../services/install.service');
// create a function to handle the install request
async function install(req, res, next) {
    // call the install service to install the database
    const installMassage = await installService.install();
    // Check if the installation was successful or not and send the appropriate response to the client
    if(installMassage.status === 200){
        // if the installation was successful, send a success message to the client
        res.status(200).json({
            message: installMassage.message
        });
    } else {
        // if the installation was not successful, send an error message to the client
        res.status(500).json({
            message: installMassage.message
        });
    }
}
// export the install function
module.exports = { install };