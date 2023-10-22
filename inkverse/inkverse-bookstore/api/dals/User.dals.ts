import User, { IUser } from "../models/User";

// create a new user
export const createUser = async (userData: IUser) => {
    const user = new User(userData);
    return user.save();
};

// find a user by email
export const findUserByEmail = async (email: string) => {
    return User.findOne({ email });
};

// find a user by username
export const findUserByUsername = async (username: string) => {
    return User.findOne({ username });
};

// Update a user by ID
export const updateUserById = async (userId: string, updatedUserData: IUser) => {
    return User.findByIdAndUpdate(userId, updatedUserData, { new: true });
};

// Delete a user by ID
export const deleteUserById = async (userId: string) => {
    return User.findByIdAndDelete(userId);
};

// Get all users
export const getAllUsers = async () => {
    return User.find({});
};
