import jwt from "jsonwebtoken";
import authModel from "../models/userModels.js";


export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Authentication token missing" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_Secret);
        req.user = decodedToken; // Attach the decoded user to the request object

        // userId from token
        const { userID } = req.user;

        // after getting user id from token , finding userid from authModel whose _id === token id:

        req.user.userDetails = await authModel.findById(userID).select("-password -createdAt -updatedAt");
        const { userDetails } = req.user;
        // return res.send(userDetails)




        // console.log(req.user);
        // res.send({ id: userID, userDetails })
        next(); // Move on to the next middleware/route
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid authentication token" });
    }
};


// admin access


// export const isAdmin = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).json({ message: "Authentication token missing" });
//         }

//         const decodedToken = jwt.verify(token, process.env.JWT_Secret);
//         req.user = decodedToken; // Attach the decoded user to the request object

//         // userId from token
//         const { userID } = req.user;

//         // Fetch user details excluding sensitive fields
//         req.user.userDetails = await authModel
//             .findById(userID)
//             .select("-password -createdAt -updatedAt");

//         // const { userDetails } = req.user;
//         // res.send(userDetails)

//         if (req.user.userDetails.role === 0) {
//             return res.status(401).json({ message: "You are not an admin" });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: "Invalid authentication token" });
//     }
// };


//! admin access

export const isAdmin = async (req, res, next) => {
    try {
        const { userDetails } = req.user
        if (req.user.userDetails.role === 0) {
            return res.status(401).json({ message: "You are not an admin" });
        } else {
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
}






















