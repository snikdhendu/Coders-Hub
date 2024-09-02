import { FilterQuery } from "mongoose";
import { IUser, User } from "../../models/User.js";
import { addUserDetails, getAllUsers, getUserById, updateUser } from "../../controllers/userController.js";
import { createProject, deleteProject, getAllProjects, getProjectById, likeProject, updateProject } from "../../controllers/projectController.js";
import { createFlowchart, deleteFlowchart, getAllFlowcharts, getFlowchartById } from "../../controllers/roadmapController.js";

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
    DELETE_FLOWCHART: deleteFlowchart,
    ADD_USER_BASIC_DETAILS: addUserDetails,
    LIKE_PROJECT: likeProject,
    DELETE_PROJECT: deleteProject,
    UPDATE_PROJECT: updateProject
  },
};
