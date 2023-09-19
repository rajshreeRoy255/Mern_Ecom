import slugify from "slugify";
import ProductModel from "../models/productModel.js";
import colors from "colors"

export const createProductController = async (req, res) => {
    try {
        const { name, description, prices, category, quantity } = req.body;
        const photo = req.file.filename
        if (!name || !description || !prices || !category || !quantity || !photo) {
            return res.status(400).json({ message: "All Fields are required" })
        } else {
            const createProduct = new ProductModel({
                name,
                slug: slugify(name),
                description,
                prices,
                category,
                quantity,
                photo
            });
            const saveProd = await createProduct.save();
            if (saveProd) {
                return res.status(200).json({
                    message: "Product Created Successfully",
                    saveProd
                })
            }
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// export const getAllProductController = async (req, res) => {
//     const search = req.query.search || "";
//     const checkbox = req.query.checkbox || "";
//     const radio = req.query.radio || "";
//     // console.log(radio.length ? radio.length : "false");
//     const newRadio = radio.split(',')

//     const query = {
//         name: { $regex: search, $options: "i" },
//     };

//     if (checkbox) {
//         query.category = { $in: checkbox.split(',') };
//     }

//     if (newRadio.length) {
//         query.prices = { $gte: newRadio[0], $lte: newRadio[1] };
//     }


//     try {
//         const fetchAllProducts = await ProductModel.find(query)
//             .populate('category')
//             .limit(12)
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             message: "All products fetched successfully",
//             success: true,
//             count: fetchAllProducts.length,
//             products: fetchAllProducts,
//         });
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
// };

export const getAllProductController = async (req, res) => {
    const search = req.query.search || "";
    const checkbox = req.query.checkbox || "";
    const radio = req.query.radio || "";

    const query = {
        name: { $regex: search, $options: "i" },
    };

    if (checkbox) {
        query.category = { $in: checkbox.split(',') };
    }

    if (radio) {
        const newRadio = radio.split(',');
        query.prices = { $gte: newRadio[0], $lte: newRadio[1] };

        try {
            const fetchAllProducts = await ProductModel.find(query)
                .populate('category')
                .limit(12)
                .sort({ createdAt: -1 });

            return res.status(200).json({
                message: "All products fetched successfully",
                success: true,
                count: fetchAllProducts.length,
                products: fetchAllProducts,
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    } else {
        // No radio button selected, fetch all products
        try {
            const fetchAllProducts = await ProductModel.find(query)
                .populate('category')
                .limit(12)
                .sort({ createdAt: -1 });

            return res.status(200).json({
                message: "All products fetched successfully",
                success: true,
                count: fetchAllProducts.length,
                products: fetchAllProducts,
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};










export const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await ProductModel.findOne({ slug: slug }).populate('category');
        console.log(product); // Check if the category field is populated correctly

        if (product) {
            return res.status(200).json({ message: "single product found successfully", product })
        } else {
            return res.status(404).json({ message: "No product found" })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const deleteProduct = await ProductModel.findByIdAndDelete(pid);
        if (deleteProduct) {
            return res.status(200).json({ message: "Product deleted successfully", deleteProduct })
        } else {
            return res.status(400).json({ message: "Error in deleting product" })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// export const updateProductController = async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const { name, description, prices, category, quantity } = req.body;
//         const file = req.file ? req.file.filename : undefined;

//         return res.send(name)

//         // Construct the update object based on the provided fields
//         const updateObject = {
//             name, slug: slugify(name), description, prices, category, quantity
//         };
//         if (file) {
//             updateObject.photo = file; // Changed from "profile" to "photo"
//         }

//         // Find the product by ID and update it
//         const updateProduct = await ProductModel.findByIdAndUpdate(pid, updateObject, { new: true });

//         if (updateProduct) {
//             return res.status(200).json({ message: "Product updated successfully", updateProduct });
//         } else {
//             return res.status(404).json({ message: "Product not found" });
//         }
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
// };


export const updateProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const { name, description, prices, category, quantity } = req.body;

        const file = req.file ? req.file.filename : undefined;
        const updateObject = {
            name, slug: slugify(name), description, prices, category, quantity
        };
        if (file) {
            updateObject.photo = file; // Changed from "profile" to "photo"
        }
        const updateProduct = await ProductModel.findByIdAndUpdate(pid, updateObject, { new: true });

        if (updateProduct) {
            return res.status(200).json({ message: "Product updated successfully", updateProduct });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }


}

// get  category product

export const getCatProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params; // cid is category ID, pid is product ID

        const fetchAllProducts = await ProductModel.find({ category: cid, _id: { $ne: pid } })
            .populate('category')
            .limit(3)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "All products fetched successfully",
            success: true,
            count: fetchAllProducts.length,
            products: fetchAllProducts,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
// GET THE LATEST 3 PRODUCTS NOT RANDOM

export const getRand3ProdController = async (req, res) => {

    try {
        const fetchLatestProducts = await ProductModel.find()
            .populate('category')
            .limit(4)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Fetched latest 3 products",
            success: true,
            count: fetchLatestProducts.length,
            products: fetchLatestProducts,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}












