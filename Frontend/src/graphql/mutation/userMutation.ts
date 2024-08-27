import { gql } from "@apollo/client";

export const editUser = gql`
mutation UserMutation($clerkUserId: String!, $collegeName: String, $location: String,$github: String,$twitter: String, $linkedIn: String, $portfolio: String, $profileUrl: String) {
  UPDATE_USER(clerkUserId: $clerkUserId, collegeName: $collegeName, location: $location,github: $github, twitter: $twitter, linkedIn: $linkedIn, portfolio: $portfolio, profileUrl: $profileUrl) {
    user {
      clerkUserId
      firstName
      lastName
      profileUrl
      about
      year
      email
      collegeName
      location
      technologies
      links {
        github
        linkedIn
        portfolio
        twitter
        leetcode
      }
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
    msg
  }
}
`;


export const addUserBasicDetails = gql`

mutation UserMutation($clerkUserId: String!,$github: String, $about: String, $leetcode: String,) {
  ADD_USER_BASIC_DETAILS(clerkUserId: $clerkUserId,about: $about,leetcode: $leetcode,github: $github) {
    clerkUserId
      firstName
      lastName
      profileUrl
      email
      about
      collegeName
      location
      year
      technologies
      links {
        github
        linkedIn
        portfolio
        twitter
        leetcode
      }
  }
}
`;

