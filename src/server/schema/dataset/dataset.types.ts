import { gql } from "apollo-server-express";


export const DatasetTypes = gql`

union DatasetResult = Customer | Product

  type Dataset{
    type: String!
  }

  type Query {
    dataset(type: String!): [DatasetResult]
   }
`;
