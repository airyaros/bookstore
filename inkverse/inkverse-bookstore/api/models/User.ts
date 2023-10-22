import mongoose, { Schema, model } from "mongoose";
const roleOptions = ["Client", "Retailer", "Admin"] as const;
type UserRole = typeof roleOptions[number];
export interface IUser extends mongoose.Document {
    userID: mongoose.ObjectId;
    username: string;
    password: string;
    email: string;
    role: UserRole;
    readonly roleOptions: typeof roleOptions; // Declare a readonly array of allowed roles
    profileDetails: {
        name: string;
        address: string;
        phone: string;
        profilePicture: string;
    };
    lastLogin: Date;
}

const userSchema = new Schema<IUser>(
    {
        userID: { type: Schema.Types.ObjectId, primaryKey: true },
        username: { type: String, unique: true },
        password: { type: String },
        email: { type: String, unique: true },
        role: { type: String, enum: roleOptions },
        profileDetails: {
            name: { type: String },
            address: { type: String },
            phone: { type: String },
            profilePicture: { type: String },
        },
        lastLogin: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
    },
);

export default model<IUser>("User", userSchema);
