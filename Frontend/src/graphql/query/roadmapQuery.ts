import { gql } from "@apollo/client";

export const GET_ALL_FLOWCHARTS = gql`
  query GetAllFlowcharts {
    getAllFlowcharts {
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
`;
