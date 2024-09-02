import { gql } from "@apollo/client";

export const createProject = gql`
  #graphql
  mutation CreateProjectMutation(
    $clerkUserId: String!
    $projectName: String!
    $tagline: String!
    $description: String!
    $technologies: [String]
    $githubRepoLink: String
    $liveLink: String
  ) {
    CREATE_PROJECT(
      clerkUserId: $clerkUserId
      projectName: $projectName
      tagline: $tagline
      description: $description
      technologies: $technologies
      githubRepoLink: $githubRepoLink
      liveLink: $liveLink
    ) {
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

export const deleteProject = gql`
  #graphql
  mutation DeleteProjectMutation(
    $clerkUserId: String!
    $projectId: ID!
  ) {
    DELETE_PROJECT(
      clerkUserId: $clerkUserId
      projectId: $projectId
    ) {
      success
      message
    }
  }
`;

export const updateProject = gql`
  #graphql
  mutation UpdateProjectMutation(
    $clerkUserId: String!
    $projectId: ID!
    $projectName: String
    $tagline: String
    $description: String
    $technologies: [String]
    $githubRepoLink: String
    $liveLink: String
    $images: [String]
    $logo: String
  ) {
    UPDATE_PROJECT(
      clerkUserId: $clerkUserId
      projectId: $projectId
      projectName: $projectName
      tagline: $tagline
      description: $description
      technologies: $technologies
      githubRepoLink: $githubRepoLink
      liveLink: $liveLink
      images: $images
      logo: $logo
    ) {
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