import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js"; // Import the order model


export const createOrderController = async (req, res) => {
    const userId = req.params.uid;
    const { paymentMode, invoice, amount } = req.body; // Extract paymentMode and invoice from the request body

    try {
        const cartItems = await cartModel.find({ userId }).populate('productId');

        if (cartItems.length > 0) {
            const productArray = cartItems.map(item => ({
                p_id: item.productId._id,
                p_name: item.productId.name,
                p_image: item.productId.photo,
                p_qty: item.quantity,
                p_price: item.productId.prices,
            }));

            // const total = cartItems.reduce((total, item) => {
            //     return total + (item.quantity * item.productId.prices);
            // }, 0);
            // const total = amount;
            const newOrder = new orderModel({
                userId,
                products: productArray,
                orderStatus: "processing", // Add the orderStatus field with default value
                invoice, // Add the invoice field received from the request body
                paymentMode, // Add the paymentMode field received from the request body
                total: amount
            });

            const savedOrder = await newOrder.save();

            // Clear the user's cart after creating the order
            await cartModel.deleteMany({ userId });

            return res.status(200).json({
                message: "Your order has been successfully placed and is now being processed. Thank you for choosing us!",
                order: savedOrder
            });
        } else {
            return res.status(404).json({ message: "No items in the cart" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



export const getOrderByIdController = async (req, res) => {
    const userId = req.params.uid;

    try {
        const orders = await orderModel.find({ userId });

        if (orders.length > 0) {
            return res.status(200).json({
                message: "Orders found",
                orders
            });
        } else {
            return res.status(404).json({ message: "You Have No Order" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



// ============  get order where status is pending  ===============
// ============ ===============================
export const getPendingOrderController = async (req, res) => {
    try {
        const processingOrders = await orderModel.find({ orderStatus: "processing" });
        if (!processingOrders) {
            return res.status(404).json({ message: "No new order user" });
        } else {
            res.status(200).json({ count: processingOrders.length, processingOrders });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// ============  get order where status is not pending  ===============
// ============ ===============================

export const getOrderHistoryController = async (req, res) => {
    try {
        const nonPendingOrders = await orderModel.find({ orderStatus: { $ne: "processing" } });
        if (nonPendingOrders.length > 0) {
            return res.status(200).json({ count: nonPendingOrders.length, nonPendingOrders });
        } else {
            return res.status(404).json({ message: "No Orders found" });
        }


    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// ============  UPDATE ORDER STATUS  ===============
// ============ ===============================

export const updateOrderStatusController = async (req, res) => {
    const orderId = req.body.orderId;
    const newStatus = req.body.newStatus;

    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(
            { _id: orderId },
            { $set: { orderStatus: newStatus } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            updatedOrder,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



















