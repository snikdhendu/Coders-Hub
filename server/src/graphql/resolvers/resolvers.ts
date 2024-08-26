import { FilterQuery } from "mongoose";
import { IUser, User } from "../../models/User.js";
import { addUserDetails, getAllUsers, getUserById, updateUser } from "../../controllers/userController.js";
import { createProject, getAllProjects, getProjectById } from "../../controllers/projectController.js";
import { createFlowchart, getAllFlowcharts, getFlowchartById } from "../../controllers/roadmapController.js";

export const graphqlResolvers = {
  Query: {
    getUserById,
    getAllUsers,
    getProjectById,
    getAllProjects,
    getFlowchartById,
    getAllFlowcharts
  },

  Mutation: {
    UPDATE_USER: updateUser,
    CREATE_PROJECT: createProject,
    CREATE_FLOWCHART: createFlowchart,
    ADD_USER_BASIC_DETAILS: addUserDetails,
  },
};
