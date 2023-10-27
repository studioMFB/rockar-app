import { gql } from "apollo-server-express";


export const ProductTypes = gql`

  type Product {
    vin: String!
    make: String!
    colour: String!
    model: String!
    price: Int!
  }
  input ProductFilterInput {
    vin: String
    make: String
    colour: String
    model: String
    price: Int
  }

  type Query {
    products(filter: ProductFilterInput): [Product] 
   }
`;

