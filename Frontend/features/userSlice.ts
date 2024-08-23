// userSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// src/features/userSlice.ts

export interface Project {
    _id:string,
    projectName: string
    tagline: string
    description: string
    technologies: string[]
    githubRepoLink: string
    liveLink: string
    images: string[]
    logo: string
}
export interface Links {
  github: string;
  leetcode: string;
  linkedIn: string;
  portfolio: string;
  twitter: string;
}

export interface User {
  about:string
  collegeName: string;
  year:string;
  email: string;
  firstName: string;
  lastName: string;
  links: Links;
  location: string;
  profileUrl: string;
  projects?: Project[];
}

const initialState: User = {
  about:'',
  collegeName: '',
  year:'',
  email: '',
  firstName: '',
  lastName: '',
  links: {
    github: '',
    leetcode: '',
    linkedIn: '',
    portfolio: '',
    twitter: '',
  },
  location: '',
  profileUrl: '',
  projects: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAbout: (state, action: PayloadAction<string>) => {
      state.about = action.payload;
    },
    setCollegeName: (state, action: PayloadAction<string>) => {
      state.collegeName = action.payload;
    },
    setYear:(state, action: PayloadAction<string>)=>{
      state.year = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setProfileUrl: (state, action: PayloadAction<string>) => {
      state.profileUrl = action.payload;
    },
    setLinks: (state, action: PayloadAction<Links>) => {
      state.links = action.payload;
    },
    setGithubLink: (state, action: PayloadAction<string>) => {
      state.links.github = action.payload;
    },
    setLeetcodeLink: (state, action: PayloadAction<string>) => {
      state.links.leetcode = action.payload;
    },
    setLinkedInLink: (state, action: PayloadAction<string>) => {
      state.links.linkedIn = action.payload;
    },
    setPortfolioLink: (state, action: PayloadAction<string>) => {
      state.links.portfolio = action.payload;
    },
    setTwitterLink: (state, action: PayloadAction<string>) => {
      state.links.twitter = action.payload;
    },
    setProjects:(state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    }
  },
});

export const {
  setAbout,
  setCollegeName,
  setYear,
  setEmail,
  setFirstName,
  setLastName,
  setLocation,
  setProfileUrl,
  setLinks,
  setGithubLink,
  setLeetcodeLink,
  setLinkedInLink,
  setPortfolioLink,
  setTwitterLink,
  setProjects
} = userSlice.actions;

export default userSlice.reducer;
