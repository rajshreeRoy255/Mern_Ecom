import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prices: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference the 'Category' model
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    // photo: {
    //     data: Buffer,
    //     contentType: String
    // },
    photo: {
        type: String,
    },
    shipping: {
        type: Boolean,
    }
}, { timestamps: true });
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;