import { User,ProjectObj } from "../models/User.js";
import { Types } from 'mongoose';

//Query functions

export const getProjectById = async (
    _: any,
    {
      clerkUserId,
      projectId,
    }: {
      clerkUserId: string;
      projectId: Types.ObjectId;
    }
  ) => {
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      throw new Error("User not found");
    }
    const project = user.projects.find((project) => (project._id as Types.ObjectId).toString() === projectId.toString());

    if (!project) {
      throw new Error("Project not found");
    }
    return project;
}

export const getAllProjects = async (): Promise<ProjectObj[]> => {
  try {
    const users = await User.find({}, "projects").exec();

    const allProjects: ProjectObj[] = users.reduce((acc: ProjectObj[], user) => {
    
      if (Array.isArray(user.projects)) {
        return acc.concat(user.projects);
      }
      return acc;
    }, []);

    return allProjects;
  } catch (error: any) {
    throw new Error("Failed to retrieve projects: " + error.message);
  }
};

//######################################################

//Mutation Functions

export const createProject = async (
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
      projectName, 
      tagline,
      description,
      technologies,
      githubRepoLink,
      liveLink,
      images: [],
      logo: "",
    };

    user.projects.push(newProject);

    try {
      await user.save();
      // Returning the last added project, which should have the _id
      const savedProject = user.projects[user.projects.length - 1];
      return savedProject;
    } catch (error: any) {
      throw new Error("Failed to save the project: " + error.message);
    }
  } else {
    throw new Error("User not found");
  }
}