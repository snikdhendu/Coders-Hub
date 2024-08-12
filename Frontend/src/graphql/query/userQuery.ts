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
  } 
}

`