import { gql } from 'apollo-server-express';
import { CustomerType, CustomerResolver } from './customer/customer.index';
import { ProductType, ProductResolver } from './product/product.index';


const typeDefs = gql`
     type Query
     ${CustomerType}
     ${ProductType}
`;

const resolvers = {
    Query: {
        ...CustomerResolver,
        ...ProductResolver,
    }
};

export {typeDefs, resolvers}