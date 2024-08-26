import { User } from "../models/User.js";

//Query functions

export const getUserById = async (_: any, { clerkUserId }: { clerkUserId: string }) => {
    const user = await User.findOne({ clerkUserId });
    if (user) return user;
    throw new Error("User not found");
}

export const getAllUsers = async () => {
  try {
      const users = await User.find({});
      return users;
  } catch (error) {
      throw new Error("Failed to fetch users");
  }
}
//######################################################

//Mutation functions

export const updateUser = async (
    _: any,
    {
      clerkUserId,
      collegeName,
      location,
      github,
      twitter,
      linkedIn,
      portfolio,
      profileUrl,
    }: {
      clerkUserId: string;
      collegeName: string;
      location: string;
      github: string;
      linkedIn: string;
      twitter: string;
      portfolio: string;
      profileUrl: string;
    }
  ) => {
    const user = await User.findOne({ clerkUserId });
    if (user) {
      user.location = location;
      user.collegeName = collegeName;
      user.links.github = github;
      user.links.twitter = twitter;
      user.links.linkedIn = linkedIn;
      user.links.portfolio = portfolio;
      user.profileUrl = profileUrl;
      await user.save();
      return { user: user, msg: "User updated successfully" };
    } else {
      return { user: null, msg: "User not found!" };
    }
  }

export const addUserDetails = async (_: any, { clerkUserId, about, leetcode, github }: { clerkUserId: string; about:string; leetcode: string; github: string }) => {
  const user = await User.findOne({ clerkUserId });
  if (user) {
    user.about = about;
    user.links.github = github;
    user.links.leetcode = leetcode;
    await user.save();
    return user;
  } else {
    return {user: null};
  }
}
//----------------------------------------


