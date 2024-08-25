import { FilterQuery } from "mongoose";
import { IUser, User } from "../../models/User.js";
import { getUserById, updateUser } from "../../controllers/userController.js";
import { createProject, getProjectById } from "../../controllers/projectController.js";
import { createFlowchart, getFlowchartById } from "../../controllers/roadmapController.js";

export const graphqlResolvers = {
  Query: {
    getUserById,
    getProjectById,
    getFlowchartById
  },

  Mutation: {
    UPDATE_USER: updateUser,
    CREATE_PROJECT: createProject,
    CREATE_FLOWCHART: createFlowchart
  },
};
