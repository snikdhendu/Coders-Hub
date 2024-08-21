import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
    projectName: string
    tagline: string
    description: string
    technologies: string[]
    githubRepoLink: string
    liveLink: string
    images: string[]
    logo: string
}

const initialState: Project = {
  projectName: '',
  tagline: '',
  description: '',
  technologies: [],
  githubRepoLink: '',
  liveLink: '',
  images: [],
  logo: '',
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
        state.projectName = action.payload;
    },
    setTagline: (state, action: PayloadAction<string>) => {
        state.tagline = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
        state.description = action.payload;
    },
    setTechnologies: (state, action: PayloadAction<string[]>) => {
        state.technologies = action.payload;
    },
    setGithubRepoLink: (state, action: PayloadAction<string>) => {
        state.githubRepoLink = action.payload;
    },
    setLiveLink: (state, action: PayloadAction<string>) => {
        state.liveLink = action.payload;
    },
    setImages: (state, action: PayloadAction<string[]>) => {
        state.images = action.payload;
    },
    setLogo: (state, action: PayloadAction<string>) => {
        state.logo = action.payload;
    },
  },
});

export const {
 setProjectName,
 setTagline,
 setDescription,
 setTechnologies,
 setGithubRepoLink,
 setLiveLink,
 setImages,
 setLogo
} = projectSlice.actions;

export default projectSlice.reducer;
