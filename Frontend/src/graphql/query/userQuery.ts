import { gql } from "@apollo/client";

export const getUsers = gql`
  #graphql
  query GetUserQuery($clerkUserId: String!) {
  getUserById(clerkUserId: $clerkUserId) {
    clerkUserId
    firstName
    lastName
    email
    collegeName
    location
    links {
      github
      linkedIn
      leetcode
      portfolio
      twitter
    }
    profileUrl
    projects {
      _id
      projectName
      tagline
      description
      technologies
      githubRepoLink
      liveLink
      logo
      images
    }
    flowcharts {
       _id
      title
      nodes {
        label
        time
        links
        tips
      }
    }
  } 
}
`