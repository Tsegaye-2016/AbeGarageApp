const orderService = require('../services/order.service')

async function createOrder(req, res,next) {
//     if (req.body.order_services.length < 1) {
//     return res.status(400).json({
//       error: "Please select at least one service!",
//     });
//   }
    try {
        const order = await orderService.createOrder(req.body);

        if (!order) {
            res.status(400).json({
                error: "Failed to add the Order!",
            });
        } else {
            res.status(200).json({ 
                status: "Order added successfully",
                data: order});
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: "Something went wrong!",
        });
    }
}
async function getAllOrders(req,res,next) {
    const orders = await orderService.getAllOrders();
    if (!orders) {
        res.status(400).json({
            error: "Fail to get orders!"
        });
    } else {
        res.status(200).json({
            status: "success",
            data: orders
        });
    }
}
async function getTotalOrders(req, res, next) {
    try {
        const totalOrders = await orderService.getTotalOrders();
        if(!totalOrders){
            res.status(400).json({
                error:"Failed To Get The Total Orders!"
            });
        }else{
            res.status(200).json({
                status:"Success",
                data:totalOrders
            })
        }
    } catch (error) {
        console.log("Something Went Wrong",error);
    }
}
module.exports = {
    createOrder,
    getAllOrders,
    getTotalOrders,
}