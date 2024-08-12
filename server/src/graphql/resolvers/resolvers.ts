import { FilterQuery } from "mongoose";
import { IUser, User } from "../../models/User.js";

export const graphqlResolvers = {
    Query: {
      hello: () => "Hello, World!",
      signup: () => "Sign up successful!",
      getUserById: async (_:any, {clerkUserId}:{clerkUserId:string}) => {
        const user = await User.findOne({ clerkUserId });
        if(user) return user;
        throw new Error("User not found");
      },      
    },

  Mutation: {
    UPDATE_USER: async (
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
        console.log(user);
        return { user: user, msg: "User updated successfully" };
      } else {
        return { user: null, msg: "User not found!" };
      }
    },
  },
};
