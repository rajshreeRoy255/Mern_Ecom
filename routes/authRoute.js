import express from "express";
import { registerController, loginController, isUserController, isAdminController, forgotPasswordController, updateUserController, getSingleUserController, getAllUsersController } from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// routing

// router.get("/send", (req, res) => {
//     res.send("sending...")
// })
// router.post("/send", (req, res) => {
//     res.send("loading...")
// })


// ! REGISTER  || METHOD POST


router.post("/register", registerController)
router.post("/login", loginController)

// FORGOT PASSWORD
router.put("/forgot-password", forgotPasswordController)

// test rout
// router.get("/test", requireSignIn, isUserController)
router.get("/isAuth", requireSignIn, isUserController)
router.get("/isAdmin", requireSignIn, isAdmin, isAdminController)



// PROTECTED ROUTE
// AUTH ROUTE
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
});
// AFMIN ROUTE
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
});




// ============  update user    ===============
// ============ ===============================
router.put("/updateUser/:uid", updateUserController)
router.get("/getSingleUser/:uid", getSingleUserController)


// ============  ALL USERS GET FOR ADMIN   ===============
// ============ ===============================

router.get("/getAllUsers", getAllUsersController)


export default router;












