import { gql } from "@apollo/client";

export const editUser = gql`
mutation UserMutation($clerkUserId: String!, $collegeName: String, $location: String,$github: String,$twitter: String, $linkedIn: String, $portfolio: String, $profileUrl: String) {
  UPDATE_USER(clerkUserId: $clerkUserId, collegeName: $collegeName, location: $location,github: $github, twitter: $twitter, linkedIn: $linkedIn, portfolio: $portfolio, profileUrl: $profileUrl) {
    user {
      clerkUserId
      firstName
      lastName
      profileUrl
      email
      collegeName
      location
      links {
        github
        linkedIn
        portfolio
        twitter
        leetcode
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

