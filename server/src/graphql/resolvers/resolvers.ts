import { User } from "../../models/User.js";

export const graphqlResolvers = {
  Query: {
    hello: () => "Hello, World!",
    signup: () => "Sign up successful!",
    users: async () => {
      const users = await User.find();
      return users;
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
      const users = await User.find({ clerkUserId });
      if (users.length > 0) {
        users[0].location = location;
        users[0].collegeName = collegeName;
        users[0].links.github = github;
        users[0].links.twitter = twitter;
        users[0].links.linkedIn = linkedIn;  
        users[0].links.portfolio = portfolio;
        users[0].profileUrl = profileUrl;
        await users[0].save();
        console.log(users[0]);
        return { user: users[0], msg: "User updated successfully" };
      } else {
        return { user: null, msg: "User not found!" };
      }
    },
  },
};
