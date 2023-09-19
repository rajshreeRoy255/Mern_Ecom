import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { clearCartController, createCartController, deleteSelectedCartProductController, getCartItemCountController, showCartController, updateQtyController } from "../controllers/cartController.js";



const router = express.Router();


router.post("/cartCreate", createCartController)
router.get("/cartShow/:uid", showCartController)
router.post("/updateQty", updateQtyController)
router.delete("/deleteSelectedCartProduct", deleteSelectedCartProductController)
router.delete("/clearCart/:uid", clearCartController)
router.get("/count/:uid", getCartItemCountController);

export default router;