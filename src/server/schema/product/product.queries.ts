import { gql } from '@apollo/client';


export const PRODUCTS_QUERY = gql`
  query getProducts($filter: ProductFilterInput) {
    products(filter: $filter) {
      vin
      make
      colour
      model
      price
    }
  }
`;