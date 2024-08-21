import { FilterQuery } from "mongoose";
import { IUser, User } from "../../models/User.js";

export const graphqlResolvers = {
  Query: {
    hello: () => "Hello, World!",
    signup: () => "Sign up successful!",
    getUserById: async (_: any, { clerkUserId }: { clerkUserId: string }) => {
      const user = await User.findOne({ clerkUserId });
      if (user) return user;
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
        return { user: user, msg: "User updated successfully" };
      } else {
        return { user: null, msg: "User not found!" };
      }
    },
    CREATE_PROJECT: async (
      _: any,
      {
        clerkUserId,
        projectName,
        tagline,
        description,
        technologies,
        githubRepoLink,
        liveLink,
      }: {
        clerkUserId: string;
        projectName: string;
        tagline: string;
        description: string;
        technologies: string[];
        githubRepoLink: string;
        liveLink: string;
      }
    ) => {
      const user = await User.findOne({ clerkUserId });
    
      if (user) {
        const newProject = {
          projectName, // Ensure this field is correctly set
          tagline,
          description,
          technologies,
          githubRepoLink,
          liveLink,
          images: [], // Initialize as needed
          logo: "", // Initialize as needed
        };
    
        user.projects.push(newProject);
    
        try {
          await user.save();
          return newProject;
        } catch (error:any) {
          throw new Error("Failed to save the project: " + error.message);
        }
      } else {
        throw new Error("User not found");
      }
    }
    
  },
};
