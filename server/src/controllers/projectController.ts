import { User, ProjectObj } from "../models/User.js";
import { Types } from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";

//Query functions

export const getProjectById = async (
  _: any,
  {
    clerkUserId,
    projectId,
  }: {
    clerkUserId: string;
    projectId: Types.ObjectId;
  },contextValue: any
) => {
    console.log("hello");
    console.log("contextvalue",contextValue);

  if (!contextValue.userId) {
    throw new ErrorHandler(401, "Not authorized to access this project");
  }
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new ErrorHandler(404,"User not found");
  }
  const project = user.projects.find(
    (project) =>
      (project._id as Types.ObjectId).toString() === projectId.toString()
  );

  if (!project) {
    throw new ErrorHandler(404,"Project not found");
  }
  return project;
};

///////////////////////////////////////

interface ProjectWithUserDetails extends ProjectObj {
  clerkUserId: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
}

export const getAllProjects = async (): Promise<ProjectWithUserDetails[]> => {
  try {
    const users = await User.find(
      {},
      "clerkUserId firstName lastName profileUrl projects"
    ).exec();

    const allProjects: ProjectWithUserDetails[] = users.reduce(
      (acc: ProjectWithUserDetails[], user) => {
        // Check if the projects array is not empty
        if (user.projects.length > 0) {
          // Add user details to each project
          const userProjects: ProjectWithUserDetails[] = user.projects.map(
            (project) => ({
              _id: project._id,
              projectName: project.projectName,
              tagline: project.tagline,
              description: project.description,
              technologies: project.technologies,
              githubRepoLink: project.githubRepoLink,
              liveLink: project.liveLink,
              images: project.images || [],
              logo: project.logo || "",
              likes: project.likes || [],
              likesCount: project.likesCount || 0,
              clerkUserId: user.clerkUserId,
              firstName: user.firstName,
              lastName: user.lastName || "",
              profileUrl: user.profileUrl || "",
            })
          );
          return acc.concat(userProjects);
        }
        return acc;
      },
      []
    );

    return allProjects;
  } catch (error: any) {
    throw new ErrorHandler(500,"Failed to retrieve projects: " + error.message);
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
  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

    const newProject = {
      projectName,
      tagline,
      description,
      technologies,
      githubRepoLink,
      liveLink,
      images: [],
      logo: "",
      likes: [],
      likesCount: 0,
    };

    user.projects.push(newProject);

    try {
      await user.save();
      // Returning the last added project, which should have the _id
      const savedProject = user.projects[user.projects.length - 1];
      return savedProject;
    } catch (error: any) {
      throw new ErrorHandler(500,"Failed to save the project: " + error.message);
    }
}
;


///////////////////////////////////////

export const likeProject = async (
  _: any,
  { clerkUserId, projectId }: { clerkUserId: string; projectId: Types.ObjectId },contextValue:any
) => {
  const {userId} = contextValue;

  if(userId==null) throw new ErrorHandler(401,"Not authenticated");

  // Step 1: Find the user who owns the project
  const user = await User.findOne({ "projects._id": projectId });

  if (!user) {
    throw new ErrorHandler(404,"User not found");
  }

  // Step 2: Find the project in the user's projects
  const project = user.projects.find(
    (project) => project._id?.toString() === projectId.toString()
  );

  if (!project) {
    throw new ErrorHandler(500,"Project not found");
  }

  // Step 3: Determine if the user has already liked the project
  const hasLiked = project.likes.includes(clerkUserId);

  if (hasLiked) {
    // User has already liked the project, so remove the like
    project.likes = project.likes.filter((id) => id !== clerkUserId);
    project.likesCount--;
  } else {
    // User has not liked the project yet, so add the like
    project.likes.push(clerkUserId);
    project.likesCount++;
  }

  // Save the updated user document
  await user.save();

  // Return the updated project
  const updatedProject = user.projects.find(
    (project) => project._id?.toString() === projectId.toString() // Use optional chaining
  );

  if (!updatedProject) {
    throw new ErrorHandler(404,"Project not found after update");
  }
const updatedProjectDetails = {
  _id: updatedProject._id,
  projectName: updatedProject.projectName,
  tagline: updatedProject.tagline,
  description: updatedProject.description,
  technologies: updatedProject.technologies,
  githubRepoLink: updatedProject.githubRepoLink,
  liveLink: updatedProject.liveLink,
  images: updatedProject.images || [],
  logo: updatedProject.logo || "",
  likes: updatedProject.likes || [],
  likesCount: updatedProject.likesCount || 0,
  clerkUserId: user.clerkUserId,
  firstName: user.firstName,
  lastName: user.lastName || "",
  profileUrl: user.profileUrl || "",
}
  return updatedProjectDetails;
};

export const deleteProject = async (
  _: any,
  {
    clerkUserId,
    projectId,
  }: {
    clerkUserId: string;
    projectId: Types.ObjectId;
  },
  contextValue: any
) => {
  if (!contextValue.userId) {
    throw new ErrorHandler(401, "Not authorized to delete this project");
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  const projectIndex = user.projects.findIndex(
    (project) =>
      (project._id as Types.ObjectId).toString() === projectId.toString()
  );

  if (projectIndex === -1) {
    throw new ErrorHandler(404, "Project not found");
  }

  user.projects.splice(projectIndex, 1);

  try {
    await user.save();
    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error: any) {
    throw new ErrorHandler(500, "Failed to delete the project: " + error.message);
  }
};

export const updateProject = async (
  _: any,
  {
    clerkUserId,
    projectId,
    projectName,
    tagline,
    description,
    technologies,
    githubRepoLink,
    liveLink,
    images,
    logo
  }: {
    clerkUserId: string;
    projectId: Types.ObjectId;
    projectName?: string;
    tagline?: string;
    description?: string;
    technologies?: string[];
    githubRepoLink?: string;
    liveLink?: string;
    images?: string[];
    logo?: string;
  },
  contextValue: any
) => {
  if (!contextValue.userId) {
    throw new ErrorHandler(401, "Not authorized to update this project");
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  const project = user.projects.find(
    (project) => (project._id as Types.ObjectId).toString() === projectId.toString()
  );

  if (!project) {
    throw new ErrorHandler(404, "Project not found");
  }

  // Update project details
  if (projectName) project.projectName = projectName;
  if (tagline) project.tagline = tagline;
  if (description) project.description = description;
  if (technologies) project.technologies = technologies;
  if (githubRepoLink) project.githubRepoLink = githubRepoLink;
  if (liveLink) project.liveLink = liveLink;
  if (images) project.images = images;
  if (logo) project.logo = logo;

  try {
    await user.save();
    return project;
  } catch (error: any) {
    throw new ErrorHandler(500, "Failed to update the project: " + error.message);
  }
};

