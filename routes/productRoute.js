import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createProductController, deleteProductController, getAllProductController, getCatProduct, getRand3ProdController, getSingleProductController, updateProductController } from "../controllers/productController.js";


import multer from "multer"

// STORAGE CONFIG
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./uploads`);
    },
    filename: function (req, file, cb) {
        const filename = `image-${Date.now()}.${file.originalname}`;
        cb(null, filename);
    }
});
// filter
const filter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        return cb(new Error("Only .png pjpg & .jpeg formatted allowed"))
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filter
});





const router = express.Router();
// routes
router.post("/create-product", upload.single("photo"), requireSignIn, isAdmin, createProductController)
router.get("/getAllProduct", getAllProductController)
router.get("/getSingleProduct/:slug", getSingleProductController)
router.delete("/deleteProduct/:pid", deleteProductController)
router.put("/updateProduct/:pid", upload.single("photo"), updateProductController)


// GET CATEGORY'S PRODUCT
router.get("/getCatProduct/:cid/:pid", getCatProduct)


// GET RANDOM THREE PRODUCTS
router.get("/getRand3Prod", getRand3ProdController)

export default router;