import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import * as userDAL from "../dals/User.dals";
import { formatError, formatSuccess } from "../utils/responseFormatter";

const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role, profileDetails } = req.body;

        // Check if the email is already in use
        const existingUser = await userDAL.findUserByEmail(email);

        if (existingUser) {
            formatError(res, 400, "Email is already in use");
            // return res.status(400).json({
            //     message: "Email is already in use",
            // });
        }

        // Check if the username is already in use
        const existingUsername = await userDAL.findUserByUsername(username);

        if (existingUsername) {
            formatError(res, 400, "Username is already in use");
            // return res.status(400).json({
            //     message: "Username is already in use",
            // });
        }

        const encryptedPass = await bcrypt.hash(password, 10);
        const user: IUser = new User({
            username,
            email,
            password: encryptedPass,
            profileDetails,
            role,
        });

        const result = await userDAL.createUser(user);

        // Generate and return a JWT token for the newly registered user
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
            },
            process.env.TOKEN_KEY as string,
        );

        res.status(201).json({
            sucess: true,
            data: {
                ...result.toJSON(),
                profileDetails,
            },
            token,
        });
    } catch (error) {
        console.error("Error:", error);
        formatError(res, 500, "Somthing went wrong");
        // res.status(500).json({
        //     error,
        //     message: "Something went wrong",
        // });
    }
};

// controller for the login
const loginUser = async (req: Request, res: Response) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Find user by email or username
        const user =
            (await userDAL.findUserByEmail(usernameOrEmail)) ||
            (await userDAL.findUserByUsername(usernameOrEmail));

        if (user) {
            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log("Password Match:", passwordMatch); // Add this line

            if (passwordMatch) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        id: user.userID,
                    },
                    process.env.TOKEN_KEY as string,
                    {
                        expiresIn: "5m",
                    },
                );

                res.status(200).json({
                    success: true,
                    data: user,
                    token,
                    message: "Logged in successfully!",
                });
            } else {
                console.log("Password does not match");
                formatError(res, 401, "Invalid Password, try again");
                // res.status(401).json({
                //     message: "Invalid Password, try again",
                // });
            }
        } else {
            console.log("No user found with this email or username");
            formatError(res, 401, "No user found with this email or username");
            // res.status(401).json({
            //     message: "No user found with this email or username!",
            // });
        }
    } catch (error) {
        console.error("Error:", error);
        formatError(res, 500, "Something went wrong");
        // res.status(500).json({
        //     error,
        //     message: "Something went wrong",
        // });
    }
};

// controller for listing all users
const findAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userDAL.getAllUsers();
        formatSuccess(res, 200, users);
        //res.status(200).json({ users, length: users.length });
    } catch (error) {
        formatError(res, 500, "Something went wrong");
       // res.status(500).json({ error });
    }
};

// update a user by id
const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updatedUserData: IUser = req.body;

        const updatedUser = await userDAL.updateUserById(userId, updatedUserData);

        if (!updatedUser) {
            formatError(res, 404, "User not found");
            // return res.status(404).json({
            //     message: "User not found",
            // });
        }
        formatSuccess(res, 200, updatedUser);
        // res.status(200).json({
        //     data: updatedUserData,
        //     message: "User updated successfully",
        // });
    } catch (error) {
        console.error("Error:", error);
        formatError(res, 500, "Something went wrong");
        // res.status(500).json({
        //     error,
        //     message: "Something went wrong",
        // });
    }
};

// Delete a user by ID
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const deletedUser = await userDAL.deleteUserById(userId);

        if (!deletedUser) {
            formatError(res, 404, "User not found");
            return ;
            // res.status(404).json({
            //     message: "User not found",
            // });
        }
        formatSuccess(res, 200, null);
        // res.status(200).json({
        //     data: deletedUser,
        //     message: "User deleted successfully!",
        // });
    } catch (error) {
        console.error("Error:", error);
        formatError(res, 500, "Something went wrong");
        // res.status(500).json({
        //     error,
        //     message: "Something went wrong",
        // });
    }
};

export default { createUser, loginUser, findAllUsers, updateUser, deleteUser };
