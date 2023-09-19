import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true
    },
    products: [
        {
            p_id: String,
            p_name: String,
            p_image: String,
            p_qty: Number,
            p_price: Number
        }
    ],
    total: {
        type: Number,
        required: true
    },
    invoice: {
        type: String,
        // required: true
    },
    paymentMode: {
        type: String,
        // required: true
    },
    orderStatus: {
        type: String,
        default: "processing",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const orderModel = mongoose.model("order", orderSchema);
export default orderModel;