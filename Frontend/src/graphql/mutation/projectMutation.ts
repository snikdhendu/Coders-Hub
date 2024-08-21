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
