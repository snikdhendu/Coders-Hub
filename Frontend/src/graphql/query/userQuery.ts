import { gql } from "@apollo/client";

export const getUsers = gql`
  #graphql
  query UserQuery {
  users {
    email
    firstName
    lastName
    collegeName
    profileUrl
    location
    links {
      github
      leetcode
      linkedIn
      twitter
      portfolio
    }
  }
  }  
`