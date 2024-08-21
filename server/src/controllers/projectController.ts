import { User, } from "../models/User.js";
import { Types } from 'mongoose';

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


