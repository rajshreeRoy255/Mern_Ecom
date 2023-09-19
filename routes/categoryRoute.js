import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createCategoryController, deleteCategory, getAllCategories, getSingleCategory, updateCategoryController } from "../controllers/categoryController.js";


const router = express.Router();
// All category routes
router.post("/create-category", requireSignIn, isAdmin, createCategoryController)
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)
router.get("/getAllCategories", getAllCategories)
router.get("/getSingleCategory/:slug", getSingleCategory)
router.delete("/deleteCategory/:id", requireSignIn, isAdmin, deleteCategory)


export default router;