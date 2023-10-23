import { gql } from '@apollo/client';


export const TYPE = "product";

export const PRODUCTS_QUERY = gql`
query getProducts($type: String!){
  dataset(type: $type) {
    __typename
    ... on Product {
      vin
      make
      colour
      model
      price
    }
  }
}
`;

export const PRODUCTS_FILTER_QUERY = gql`
  query getFilteredProducts($filter: CustomerFilterInput!) {
    products(filter: $filter) {
        vin
        make
        colour
        model
        price
    }
  }
`;