import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      _id
      projectName
      tagline
      description
      technologies
      githubRepoLink
      liveLink
      images
      logo
    }
  }
`;
