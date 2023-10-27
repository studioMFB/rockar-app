import { gql } from '@apollo/client';


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