import { gql } from "apollo-server-express";


export const DatasetType = gql`

union DatasetResult = Customer | Product

  type Dataset{
    type: String!
  }

  type Query {
    dataset(type: String!): [DatasetResult]
   }
`;
