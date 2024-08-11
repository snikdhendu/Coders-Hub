import { gql } from "@apollo/client";

export const getUsers = gql`#graphql
  query ExampleQuery {
    hello
    signup
    users{
        firstName
        email
        links {
            github
        }
  }
}

`;