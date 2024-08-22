import { FilterQuery } from "mongoose";
import { IUser, User } from "../../models/User.js";
import { getUserById, updateUser } from "../../controllers/userController.js";
import { createProject, getProjectById } from "../../controllers/projectController.js";

export const graphqlResolvers = {
  Query: {
    getUserById,
    getProjectById,
  },

  Mutation: {
    UPDATE_USER: updateUser,
    CREATE_PROJECT: createProject,
  },
};
