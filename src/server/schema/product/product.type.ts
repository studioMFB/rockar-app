import { gql } from "apollo-server-express";


export const ProductType = gql`

  type Product {
    vin: String!
    make: String!
    colour: String!
    model: String!
    price: Int!
  }

  type Query {
    getAllProducts: [Product] 
    getProduct(colour: String!): Product 
   }
`;

