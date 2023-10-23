import { gql } from "apollo-server-express";
import { EmailAddress, PostalCode } from 'graphql-scalars/typings/typeDefs';


export const CustomerTypes = gql`

  type Customer{
    email: EmailAddress
    forename: String!
    surname: String!
    contactNumber: String
    postcode: PostalCode
  }

  input CustomerFilterInput {
    email: String
    forename: String
    surname: String
    contactNumber: String
    postcode: String
  }

  type Query {
    customers(filter: CustomerFilterInput): [Customer] 
   }
`;
