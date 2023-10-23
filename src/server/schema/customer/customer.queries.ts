import { gql } from '@apollo/client';


// export const TYPE = "customer";

// export const CUSTOMERS_QUERY = gql`
//   query getCustomers($type: String!){
//     dataset(type: $type) {
//       __typename
//       ... on Customer {
//         forename
//         surname
//       }
//     }
//   }
// `;

export const CUSTOMERS_NAME_QUERY = gql`
  query getCustomers($filter: CustomerFilterInput){
    customers(filter: $filter) {
        forename
        surname
      }
  }
`;

export const CUSTOMERS_QUERY = gql`
  query getFilteredCustomers($filter: CustomerFilterInput!) {
    customers(filter: $filter) {
      forename
      surname
      email
      contactNumber
      postcode
    }
  }
`;