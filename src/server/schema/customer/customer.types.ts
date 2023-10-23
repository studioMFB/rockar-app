import { gql } from "apollo-server-express";
import { EmailAddress, PhoneNumber, PostalCode } from 'graphql-scalars/typings/typeDefs';


const CustomerTypes = gql`

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
    customers:[Customer]
    customersFilter(filter: CustomerFilterInput!): [Customer] 
   }
`;

export{CustomerTypes as CustomerType};
