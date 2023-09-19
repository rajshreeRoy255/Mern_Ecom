import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createOrderController, getOrderByIdController, getOrderHistoryController, getPendingOrderController, updateOrderStatusController } from "../controllers/orderController.js";




const router = express.Router();


// router.post("/create", async (req, res) => {
//     res.send("order")
// })
router.post("/create/:uid", createOrderController)
router.get("/getOrderById/:uid", getOrderByIdController)


// ============  get order where status is pending and not pending  ===============
// ============ ===============================
router.get("/pendingOrder", getPendingOrderController)
router.get("/orderHistory", getOrderHistoryController)
router.put("/updateOrderStatus", updateOrderStatusController)








export default router;