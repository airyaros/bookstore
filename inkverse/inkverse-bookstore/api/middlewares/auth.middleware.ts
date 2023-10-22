import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request type to include userId
declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }
  

// Middleware to generate a JWT token
export const generateToken = (req: Request | any, _res: Response, next: NextFunction) => {
    const data: { email: string } = req.body;
    const token = jwt.sign(
        {
            email: data.email,
        },
        process.env.TOKEN_KEY as string,
    );

    // this will set the token in the authorization header
    req.headers.authorization = `Bearer ${token}`;

    next();
};

// Middleware to protect routes (requires a valid token)
export const protect = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        // cheking the presence of the valid token in the auth header
        const authHeader = req.headers.authorization;

        //extract the token from the auth header
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as JwtPayload;

        if (!decoded.email) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        // Get user from the token
        req.user = (await User.findOne({ email: decoded.email })) as IUser;

        next();
    } catch (error) {
        res.status(401).json({
            message: "You are not authenticated.",
            error,
        });
    }
};

// Middleware to protect routes for admin access (requires a valid token with admin role)
export const adminProtect = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        // Check for the presence of a valid token in the Auth header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, no token",
            });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as JwtPayload;

        if (!decoded.email) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        // Get user from the token
        req.user = (await User.findOne({ email: decoded.email })) as IUser;

        // Check if the user has the "Admin" role
        if (!req.user || req.user.role !== "Admin") {
            return res
                .status(401)
                .json({ message: "You are not authorized to access this resource." });
        }

        next();
    } catch (error) {
        res.status(401).json({
            message: "User is not authenticated.",
            error,
        });
    }
};

// Middleware to extract user ID from the token and store it in the request object
export const extractUserId = (req: Request | any, res: Response, next: NextFunction) => {
    try {
        // Check if there's a valid token in the request headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as JwtPayload;

        // Check if the token is valid and contains an 'id'
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Store the 'id' from the token in the request object
        req.userId = decoded.id;

        next();
    } catch (error) {
        res.status(401).json({ message: "You are not authenticated.", error });
    }
};
