import { Document, model, Schema, Types } from 'mongoose';

// Interface for the links object
interface LinksObj {
  github: string;
  linkedIn: string;
  portfolio: string;
  twitter: string;
  leetcode: string;
}

// Interface for the project object
interface ProjectObj {
  _id?: Types.ObjectId;
  projectName: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubRepoLink: string;
  liveLink: string;
  images?: string[];
  logo?: string;
}

// Interface for a node in the flowchart
interface FlowchartNode {
  label: string;
  time: string;
  links: string[];
  tips: string;
}

// Interface for the flowchart
interface FlowchartObj {
  _id?: Types.ObjectId;
  title: string;
  nodes: FlowchartNode[];
}

// Main user interface extending Mongoose Document
interface IUser extends Document {
  clerkUserId: string;
  firstName: string;
  lastName?: string;
  about?: string;
  year?: string;
  profileUrl?: string;
  email: string;
  collegeName?: string;
  location?: string;
  links: LinksObj;
  techStack?: string[];
  projects: ProjectObj[];
  flowcharts: FlowchartObj[];
}

// Schema for the links object
const LinksSchema = new Schema<LinksObj>({
  github: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  twitter: { type: String, default: '' },
  leetcode: { type: String, default: '' },
}, { _id: false });

// Schema for the projects object
const ProjectSchema = new Schema<ProjectObj>({
  projectName: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }], // required: true will be set in the future
  githubRepoLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  images: [{ type: String, default: [] }],
  logo: { type: String }, // required: true will be set in the future
});

// Schema for the flowchart nodes
const FlowchartNodeSchema = new Schema<FlowchartNode>({
  label: { type: String, required: true },
  time: { type: String, required: true },
  links: [{ type: String, default: [] }],
  tips: { type: String, required: true },
}, { _id: false });

// Schema for the flowchart
const FlowchartSchema = new Schema<FlowchartObj>({
  title: { type: String, required: true },
  nodes: { type: [FlowchartNodeSchema], required: true },
});

// Schema for the User
const UserSchema = new Schema<IUser>({
  clerkUserId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  about: { type: String, default: '' },
  year: { type: String, default: '' },
  profileUrl: { type: String },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  collegeName: { type: String, default: '' },
  location: { type: String, default: '' },
  links: { type: LinksSchema, default: {} },
  techStack: { type: [String], default: [] }, 
  projects: { type: [ProjectSchema], default: [] },
  flowcharts: { type: [FlowchartSchema], default: [] },
}, {
  timestamps: true,
});

// Create and export the User model
export const User = model<IUser>('User', UserSchema);
export type { LinksObj, ProjectObj, FlowchartNode, FlowchartObj, IUser };
