import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference the 'User' model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference the 'Product' model
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
    }
});
const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;