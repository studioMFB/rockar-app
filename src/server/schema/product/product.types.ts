import { gql } from "apollo-server-express";


export const ProductTypes = gql`

  type Product {
    vin: String!
    make: String!
    colour: String!
    model: String!
    price: Int!
  }

  type Query {
    product(colour: String!): Product 
   }
`;

