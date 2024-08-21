import { Document, model, Schema, Types  } from 'mongoose';

// Interface for the links object
interface LinksObj {
  github: string;
  linkedIn: string;
  portfolio: string;
  twitter: string;
  leetcode: string; 
}

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

// Main user interface extending Mongoose Document
interface IUser extends Document {
  clerkUserId: string;
  firstName: string;
  lastName?: string;
  profileUrl?: string;
  email: string;
  collegeName?: string;
  location?: string;
  links: LinksObj;
  projects: ProjectObj[];
}

// Schema for the links object
const LinksSchema = new Schema<LinksObj>({
  github: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  twitter: { type: String, default: '' },
  leetcode: { type: String, default: '' },
}, { _id: false }); // _id: false to prevent creating an _id for this subdocument

// Schema for the projects object
const ProjectSchema = new Schema<ProjectObj>({
  projectName: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, }], //required true will be set in future
  githubRepoLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  images: [{ type: String, default: [] }],
  logo: { type: String, }, // required true will be set in future
});

// Schema for the User
const UserSchema = new Schema<IUser>({
  clerkUserId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' }, 
  profileUrl: { type: String },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  collegeName: { type: String, default: '' }, 
  location: { type: String, default: '' }, 
  links: { type: LinksSchema, default: {} }, 
  projects: { type: [ProjectSchema], default: [] }, // Default value is an empty array
}, {
  timestamps: true, 
});

// Create and export the User model
export const User = model<IUser>('User', UserSchema);
export type { LinksObj, ProjectObj, IUser }; 
