import { FlowchartNode, User,FlowchartObj } from "../models/User.js";
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

  export const getAllFlowcharts = async (): Promise<FlowchartObj[]> => {
    try {
 
      const users = await User.find({}, "flowcharts").exec();
  
      // Accumulate all flowcharts into a single array
      const allFlowcharts: FlowchartObj[] = users.reduce((acc: FlowchartObj[], user) => {
  
        if (Array.isArray(user.flowcharts)) {
          return acc.concat(user.flowcharts);
        }
        return acc;
      }, []);
  
      return allFlowcharts;
    } catch (error: any) {
      throw new Error("Failed to retrieve flowcharts: " + error.message);
    }
  };

  
  export const deleteFlowchart = async (
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

    const flowchartIndex = user.flowcharts.findIndex(
        (flowchart) => (flowchart._id as Types.ObjectId).toString() === flowchartId.toString()
    );

    if (flowchartIndex === -1) {
        throw new Error("Flowchart not found");
    }

    user.flowcharts.splice(flowchartIndex, 1);

    try {
        await user.save();
        return { success: true, message: "Flowchart deleted successfully" };
    } catch (error: any) {
        throw new Error("Failed to delete the flowchart: " + error.message);
    }
};