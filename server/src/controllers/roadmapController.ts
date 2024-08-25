import { FlowchartNode, User, } from "../models/User.js";
import { Types } from 'mongoose';


export const getFlowchartById = async (
    _: any,
    {
      clerkUserId,
      flowchartId,
    }: {
      clerkUserId: string;
      flowchartId: Types.ObjectId;
    }
) => {
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      throw new Error("User not found");
    }
    const flowchart = user.flowcharts.find((flowchart) => (flowchart._id as Types.ObjectId).toString() === flowchartId.toString());

    if (!flowchart) {
      throw new Error("Project not found");
    }
    return flowchart;
}

export const createFlowchart = async (
    _: any,
    {
      clerkUserId,
      title,
      nodes
    }: {
      clerkUserId: string;
      title: string;
      nodes: FlowchartNode[];
    
    }
  ) => {
    const user = await User.findOne({ clerkUserId });
  
    if (user) {
      const newflowchart = {
        title,
        nodes
      };
  
      user.flowcharts.push(newflowchart);
  
      try {
        await user.save();
        const savedFlowchart = user.flowcharts[user.flowcharts.length - 1];
        return savedFlowchart;
      } catch (error: any) {
        throw new Error("Failed to save the flowchart: " + error.message);
      }
    } else {
      throw new Error("User not found");
    }
  }