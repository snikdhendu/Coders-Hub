import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
  getAllProjects {
    _id
    projectName
    tagline
    description
    githubRepoLink
    liveLink
    technologies
    images
    logo
    likes
    likesCount
    clerkUserId
    firstName
    lastName
    profileUrl
  }
}
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: ID!) {
    project(id: $id) {
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