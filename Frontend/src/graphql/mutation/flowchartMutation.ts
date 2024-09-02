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

export const deleteFlowchart = gql`
  #graphql
  mutation DeleteFlowchartMutation(
    $clerkUserId: String!
    $flowchartId: ID!
  ) {
    DELETE_FLOWCHART(
      clerkUserId: $clerkUserId
      flowchartId: $flowchartId
    ) {
      success
      message
    }
  }
`;
