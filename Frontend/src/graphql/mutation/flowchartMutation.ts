import { gql } from "@apollo/client";

export const createFlowchart = gql`
  #graphql
  mutation CreateFlowchartMutation(
    $clerkUserId: String!
    $title: String!
    $nodes: [FlowchartNodeInput!]!
  ) {
    CREATE_FLOWCHART(
      clerkUserId: $clerkUserId
      title: $title
      nodes: $nodes
    ) {
      title
      nodes {
        label
        time
        links
        tips
      }
    }
  }
`;