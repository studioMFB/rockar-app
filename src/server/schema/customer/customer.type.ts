import { gql } from "apollo-server-express";
// import { EmailAddress, PhoneNumber, PostalCode } from 'graphql-scalars/typings/typeDefs';


const CustomerType = gql`

  type Customer{
    email: String
    forename: String!
    surname: String!
    contactNumber: String
    postcode: String
  }

  type Query {
    getAllCustomers: [Customer] 
    getCustomer(arg: String): Customer 
   }
`;

export{CustomerType};
