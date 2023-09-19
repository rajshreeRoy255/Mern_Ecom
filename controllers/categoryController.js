import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "name field is required" })
        } else {

            // Find if existing category
            const existingCategory = await categoryModel.findOne({ name: name });
            if (existingCategory) {
                return res.status(400).json({ message: "Category already exist" })
            } else {
                // save category
                const newCategory = await new categoryModel({
                    name: name,
                    slug: slugify(name)
                })
                const saveCategory = await newCategory.save()
                if (saveCategory) {
                    return res.status(200).json({ message: "New Category Created Successfully" })
                }
            }
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// UPDATE CATEGORY

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        if (category) {
            return res.status(200).json({ message: "category updated successfully", category })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
    try {
        const getCategoies = await categoryModel.find({})
        return res.status(200).json({ message: "fetched all categories", getCategoies })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// GET SINGLE CATEGORY
export const getSingleCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug: slug })
        if (!category) {
            return res.status(400).json({ message: "Failed to fetch single category", success: false })
        } else {
            return res.status(200).json({ message: "fetched Single category", success: true, category })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}


// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await categoryModel.findByIdAndDelete(id)
        if (!deleteCategory) {
            return res.status(400).json({ message: "failed to delete category", success: false })
        } else {
            return res.status(200).json({ message: "Category deleted successfully", success: true, deleteCategory })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}










