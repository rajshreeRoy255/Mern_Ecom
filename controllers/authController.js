import userModel from "../models/userModels.js"
import bcryptjs from "bcryptjs";
import { someFunction, anotherFunction } from "../helpers/test.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Jwt from "jsonwebtoken";



// ! REGISTER
export const registerController = async (req, res) => {
    try {
        const { name, email, password, cp, phone, address, answer } = req.body;
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).json({ message: "All fields are required" })
        } else {
            // find existing if user
            const isUser = await userModel.findOne({ email: email });
            if (isUser) {
                return res.status(400).json({ message: "User already exist " })
            } else {
                // hass password
                const hasedPassword = await hashPassword(password)
                // Save a user
                const newUser = new userModel({
                    username: name,
                    email,
                    password: hasedPassword,
                    phone,
                    address,
                    answer
                })
                const saveUser = await newUser.save()
                if (saveUser) {
                    return res.status(200).json({ message: "User Registration successfully" })
                }

            }
            console.log(isUser);
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// ! LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ message: "All fields required" });
        } else {
            // Find if user is registered or not
            const isEmail = await userModel.findOne({ email: email });
            if (isEmail) {
                const match = await comparePassword(password, isEmail.password)

                if (match) {
                    if (isEmail.email === email && isEmail.password && match) {

                        // token generate
                        const token = await Jwt.sign({ userID: isEmail._id }, process.env.JWT_Secret, { expiresIn: "2d" });
                        return res.status(200).json({
                            message: "Login Successfully",
                            user: {
                                id: isEmail._id,
                                name: isEmail.username,
                                email: isEmail.email,
                                phone: isEmail.phone,
                                address: isEmail.address,
                                role: isEmail.role,
                            },
                            token,
                        })
                    } else {
                        return res.send({ message: "Incorrect email or password" });
                    }

                } else {
                    return res.send({ message: "incorrect password " });


                }


                // if (isEmail.email === email && isEmail.password && await bcryptjs.compare(password.toString(), isEmail.password)) {

                //     // token generate
                //     const token = Jwt.sign({ userID: isEmail._id }, process.env.JWT_Secret, { expiresIn: "2d" });
                //     return res.status(200).json({
                //         message: "Login Successfully",
                //         token,
                //         name: isEmail.username
                //     })
                // } else {
                //     return res.send({ message: "Incorrect email or password" });
                // }
            } else {
                return res.send({ message: "Invalid credentials" });
            }
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const isUserController = async (req, res) => {
    try {
        const { userDetails } = req.user
        return res.send({
            userDetails,
            message: "Yes you are a user. welcome to this protected route"
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    // return res.send("testing controller-----> PROTECTED")
}


export const isAdminController = async (req, res) => {
    return res.send("Admin route-----> PROTECTED")
}


// ! FORGOT PASSWORD

export const forgotPasswordController = async (req, res) => {
    const { answer, email, newPassword } = req.body;
    try {
        if (!answer || !email || !newPassword) {
            return res.send({ message: "All fields required" });
        } else {
            // find if already a user
            const isUser = await userModel.findOne({ email, answer });
            if (isUser) {

                // hass password
                const hasedPassword = await hashPassword(newPassword);

                // UPDATE PASSWORD WITH NEW PASSWORD
                const upadetPass = await userModel.findByIdAndUpdate(isUser._id, { password: hasedPassword }, { new: true });

                if (upadetPass) {
                    return res.status(200).json({ message: "Password Reset Successfully" })
                }


            } else {
                return res.status(400).send({ message: "Wrong Email Or Answer" });
            }

        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


export const updateUserController = async (req, res) => {
    const userId = req.params.uid;
    const { username, phone, address } = req.body;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = username || user.username;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        const updatedUser = await user.save();

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


export const getSingleUserController = async (req, res) => {
    const userId = req.params.uid;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}




// ============  ALL USERS GET FOR ADMIN   ===============
// ============ ===============================

export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({ role: 0 });
        res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}























