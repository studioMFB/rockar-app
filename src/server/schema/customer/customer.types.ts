import { gql } from "apollo-server-express";
import { EmailAddress, PhoneNumber, PostalCode } from 'graphql-scalars/typings/typeDefs';


const CustomerTypes = gql`

  type Customer{
    email: EmailAddress
    forename: String!
    surname: String!
    contactNumber: PhoneNumber
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
    # customers: [Customer] 
    customers(filter: CustomerFilterInput!): [Customer] 
   }
`;

export{CustomerTypes as CustomerType};
