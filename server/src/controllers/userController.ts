import { User } from "../models/User.js";

export const getUserById = async (_: any, { clerkUserId }: { clerkUserId: string }) => {
    const user = await User.findOne({ clerkUserId });
    if (user) return user;
    throw new Error("User not found");
}